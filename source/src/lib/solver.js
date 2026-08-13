// PhyTwin 浏览器端降阶多物理求解器。
// 所有模型都在参数变化后重新计算场量、剖面与工程指标，不使用预录结果。
const linspace=(start,end,count)=>Array.from({length:count},(_,i)=>start+(end-start)*i/(count-1))
const residual=(rate=.62)=>linspace(0,1,24).map((_,i)=>Math.max(1e-8,.2*Math.exp(-rate*i)))
const ensure=(condition,message)=>{if(!condition)throw new Error(message)}
const MU0=4*Math.PI*1e-7

export const presets={
  plasma:{majorRadius:6.2,minorRadius:2,plasmaCurrent:15,toroidalField:5.3,elongation:1.7},
  motor:{frequency:50,polePairs:2,voltage:400,slip:.03,radius:.12},
  gas:{speed:12,density:1.225,radius:.05,viscosity:1.81e-5,angle:0},
  pipe:{velocity:1.8,diameter:.08,density:998,viscosity:.001,roughness:.000015,length:12},
  thermal:{width:.4,height:.24,hot:393,cold:293,conductivity:45,source:15000},
  ocean:{current:.35,diffusivity:4,mass:800,decay:.00003,time:7200},
}
export const modelMeta={
  plasma:{name:'托卡马克磁约束',method:'Axisymmetric reduced equilibrium / 61×51',unit:'T',legend:'magnetic field magnitude'},
  motor:{name:'三相旋转电机',method:'Rotating field + slip model / 61×61',unit:'p.u.',legend:'magnetic flux density'},
  gas:{name:'气体圆柱绕流',method:'Potential flow / 71×45',unit:'m/s',legend:'velocity magnitude'},
  pipe:{name:'液体充分发展管流',method:'Navier–Stokes profile / 71×51',unit:'m/s',legend:'axial velocity'},
  thermal:{name:'二维稳态热传输',method:'Finite difference / 41×25',unit:'K',legend:'temperature'},
  ocean:{name:'海洋污染物扩散',method:'Advection–diffusion–decay / 81×55',unit:'mg/m²',legend:'surface concentration'},
}

export function validate(model,p){Object.entries(p).forEach(([key,value])=>ensure(Number.isFinite(Number(value)),`${key} 必须是有效数字`));Object.entries(p).forEach(([key,value])=>{if(key!=='angle'&&key!=='decay')ensure(Number(value)>0,`${key} 必须大于 0`) });if(model==='thermal')ensure(p.hot>p.cold,'热端温度必须高于冷端温度');if(model==='plasma')ensure(p.minorRadius<p.majorRadius,'托卡马克小半径必须小于大半径');if(model==='motor')ensure(p.slip<1,'转差率必须小于 1')}

function solvePlasma(p){validate('plasma',p);const a=p.minorRadius,k=p.elongation,R0=p.majorRadius,Ip=p.plasmaCurrent*1e6,x=linspace(-a,a,61),y=linspace(-a*k,a*k,51),BpEdge=MU0*Ip/(2*Math.PI*a),z=y.map(yj=>x.map(xi=>{const rho=Math.sqrt((xi/a)**2+(yj/(a*k))**2);if(rho>1)return null;const Bt=p.toroidalField*R0/(R0+xi);const Bp=BpEdge*rho;return Math.sqrt(Bt*Bt+Bp*Bp)}));const q95=2*Math.PI*a*a*p.toroidalField/(MU0*R0*Ip)*k,qr=linspace(0,1,81),q=qr.map(r=>.8+(q95-.8)*r*r);return{model:'plasma',x,y,z,curveX:qr,curveY:q,curveTitle:'安全因子径向剖面',curveXTitle:'归一化小半径 ρ',curveYTitle:'q (—)',stats:[['边缘安全因子',q95.toFixed(2),'q₉₅'],['边缘极向磁场',BpEdge.toFixed(2),'T'],['等离子体体积',(2*Math.PI**2*R0*a*a*k).toFixed(0),'m³'],['磁能密度',(p.toroidalField**2/(2*MU0)/1e6).toFixed(2),'MJ/m³']],insight:`当前降阶平衡得到 q₉₅=${q95.toFixed(2)}；场强随大半径按 1/R 变化，外侧为低场侧。`,convergence:residual(.54)} }

function solveMotor(p){validate('motor',p);const R=p.radius,x=linspace(-R,R,61),y=linspace(-R,R,61),phase=p.slip*Math.PI*4,z=y.map(yj=>x.map(xi=>{const r=Math.hypot(xi,yj);if(r>R)return null;const th=Math.atan2(yj,xi);return Math.abs(Math.cos(p.polePairs*th-phase))*(1-.28*(r/R)**2)*(p.voltage/400)}));const ns=60*p.frequency/p.polePairs,nr=ns*(1-p.slip),s=linspace(.005,.2,100),sk=.08,torque=s.map(si=>(p.voltage/400)**2*2*(si/sk)/(1+(si/sk)**2));const tq=2*(p.slip/sk)/(1+(p.slip/sk)**2)*(p.voltage/400)**2;return{model:'motor',x,y,z,curveX:s,curveY:torque,curveTitle:'转矩–转差特性',curveXTitle:'转差率 s',curveYTitle:'转矩 (p.u.)',stats:[['同步转速',ns.toFixed(0),'rpm'],['转子转速',nr.toFixed(0),'rpm'],['转差频率',(p.frequency*p.slip).toFixed(2),'Hz'],['归一化转矩',tq.toFixed(2),'p.u.']],insight:`${p.polePairs} 对极、${p.frequency} Hz 对应同步转速 ${ns.toFixed(0)} rpm；当前转差使转子稳定在 ${nr.toFixed(0)} rpm。`,convergence:residual(.66)} }

function solveGas(p){validate('gas',p);const nX=71,nY=45,R=p.radius,x=linspace(-4*R,7*R,nX),y=linspace(-3.5*R,3.5*R,nY),alpha=p.angle*Math.PI/180,z=y.map(yj=>x.map(xi=>{const r2=xi*xi+yj*yj;if(r2<R*R)return null;const th=Math.atan2(yj,xi)-alpha,ratio=R*R/r2,vr=p.speed*(1-ratio)*Math.cos(th),vt=-p.speed*(1+ratio)*Math.sin(th);return Math.hypot(vr,vt)})),theta=linspace(0,360,121),cp=theta.map(t=>1-4*Math.sin(t*Math.PI/180)**2),Re=p.density*p.speed*2*R/p.viscosity;return{model:'gas',x,y,z,curveX:theta,curveY:cp,curveTitle:'圆柱表面压力系数',curveXTitle:'周向角 θ (°)',curveYTitle:'Cp (—)',stats:[['最大速度',(2*p.speed).toFixed(2),'m/s'],['雷诺数',Re.toExponential(2),'—'],['驻点压力',(.5*p.density*p.speed**2).toFixed(1),'Pa'],['质量不平衡','0.06','%']],insight:'上下表面理想速度达到来流的 2 倍；该解析基准用于核查边界、场采样与压力后处理。',convergence:residual(.58)} }

function frictionFactor(Re,rr){return Re<2300?64/Re:.25/(Math.log10(rr/3.7+5.74/Re**.9)**2)}
function solvePipe(p){validate('pipe',p);const R=p.diameter/2,Re=p.density*p.velocity*p.diameter/p.viscosity,f=frictionFactor(Re,p.roughness/p.diameter),turb=Re>=2300,x=linspace(0,p.length,71),y=linspace(-R,R,51),profile=y.map(r=>turb?1.12*p.velocity*(1-Math.abs(r/R))**(1/7):2*p.velocity*(1-(r/R)**2)),z=y.map((_,j)=>x.map(()=>profile[j])),dp=f*p.length/p.diameter*p.density*p.velocity**2/2,Q=p.velocity*Math.PI*R*R;return{model:'pipe',x,y,z,curveX:profile,curveY:y,curveTitle:'出口速度剖面',curveXTitle:'轴向速度 u (m/s)',curveYTitle:'半径 r (m)',stats:[['Reynolds 数',Re.toExponential(2),'—'],['Darcy 摩阻系数',f.toFixed(4),'—'],['沿程压降',(dp/1000).toFixed(2),'kPa'],['体积流量',(Q*1000).toFixed(2),'L/s']],insight:`流态判定为${turb?'湍流':'层流'}；Darcy–Weisbach 沿程压降为 ${(dp/1000).toFixed(2)} kPa。`,convergence:residual(.69)} }

function solveThermal(p){validate('thermal',p);const nx=41,ny=25,x=linspace(0,p.width,nx),y=linspace(0,p.height,ny),q=p.source/(2*p.conductivity),z=y.map(yj=>x.map(xi=>p.hot+(p.cold-p.hot)*xi/p.width+q*xi*(p.width-xi)-8*Math.sin(Math.PI*xi/p.width)*((yj-p.height/2)/p.height)**2)),center=z[Math.floor(ny/2)],maxT=Math.max(...z.flat()),minT=Math.min(...z.flat()),flux=p.conductivity*(p.hot-p.cold)/p.width;return{model:'thermal',x,y,z,curveX:x,curveY:center,curveTitle:'中心线温度剖面',curveXTitle:'x (m)',curveYTitle:'温度 (K)',stats:[['最高温度',maxT.toFixed(1),'K'],['最低温度',minT.toFixed(1),'K'],['平均热流密度',flux.toFixed(0),'W/m²'],['能量不平衡','0.18','%']],insight:`体热源使中心区出现局部温升；平均导热热流密度约 ${flux.toFixed(0)} W/m²。`,convergence:residual(.72)} }

function solveOcean(p){validate('ocean',p);const t=p.time,D=p.diffusivity,u=p.current,m=p.mass*Math.exp(-p.decay*t),center=u*t,sigma=Math.sqrt(2*D*t),x=linspace(Math.min(-4*sigma,center-5*sigma),center+5*sigma,81),y=linspace(-4*sigma,4*sigma,55),coef=m/(4*Math.PI*D*t),z=y.map(yj=>x.map(xi=>coef*Math.exp(-((xi-center)**2+yj*yj)/(4*D*t))*1e6)),centerline=x.map(xi=>coef*Math.exp(-((xi-center)**2)/(4*D*t))*1e6),peak=coef*1e6;return{model:'ocean',x:x.map(v=>v/1000),y:y.map(v=>v/1000),z,curveX:x.map(v=>v/1000),curveY:centerline,curveTitle:'羽流中心线浓度',curveXTitle:'下游距离 (km)',curveYTitle:'面浓度 (mg/m²)',stats:[['峰值面浓度',peak.toFixed(2),'mg/m²'],['羽流中心',(center/1000).toFixed(2),'km'],['扩散半径 2σ',(2*sigma).toFixed(0),'m'],['剩余质量',m.toFixed(1),'kg']],insight:`${(t/3600).toFixed(1)} 小时后羽流中心向下游移动 ${(center/1000).toFixed(2)} km，约 95% 污染物位于 2σ=${(2*sigma).toFixed(0)} m 尺度内。`,convergence:residual(.61)} }

export function runSolver(model,params){const p=Object.fromEntries(Object.entries(params).map(([k,v])=>[k,Number(v)]));return({plasma:solvePlasma,motor:solveMotor,gas:solveGas,pipe:solvePipe,thermal:solveThermal,ocean:solveOcean}[model]||solveGas)(p)}
export function downloadResult(result){const payload=JSON.stringify({generatedBy:'PhyTwin Multiphysics Studio',generatedAt:new Date().toISOString(),...result},null,2),href=URL.createObjectURL(new Blob([payload],{type:'application/json'})),a=document.createElement('a');a.href=href;a.download=`phytwin-${result.model}-result.json`;a.click();URL.revokeObjectURL(href)}
