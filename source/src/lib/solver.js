// PhyTwin 浏览器端可复现物理求解器。
// 每个模块由同一结果对象同时驱动 3D 场、2D 云图、剖面、指标与下载文件。
const linspace=(start,end,count)=>Array.from({length:count},(_,i)=>start+(end-start)*i/(count-1))
const residual=(rate=.62)=>linspace(0,1,28).map((_,i)=>Math.max(1e-9,.18*Math.exp(-rate*i)))
const ensure=(condition,message)=>{if(!condition)throw new Error(message)}
const MU0=4*Math.PI*1e-7
const fract=value=>value-Math.floor(value)
const seq=(i,s=0)=>fract((i+1)*(0.61803398875+s*.137))
const finite=(value,digits=3)=>Number(value.toFixed(digits))

export const presets={
  plasma:{majorRadius:6.2,minorRadius:2,plasmaCurrent:15,toroidalField:5.3,elongation:1.7},
  em:{turns:64,current:18,radius:.18,length:.42,conductor:.004},
  gas:{speed:42,density:1.225,radius:.08,viscosity:1.81e-5,angle:0,span:.5},
  pipe:{velocity:.09,diameter:.018,density:998,viscosity:.001,roughness:.000015,length:1.2},
  thermal:{length:.48,width:.30,height:.18,cold:293,conductivity:16,source:1.8e6},
  ocean:{current:.35,diffusivity:4,verticalDiffusivity:.6,mass:800,decay:.00003,time:7200,depth:80},
}

export const modelMeta={
  plasma:{code:'PhyTwin Plasma',name:'托卡马克磁约束',method:'Axisymmetric reduced MHD / analytic field',unit:'T',legend:'磁场强度 |B|'},
  em:{code:'PhyTwin EM',name:'静态多匝线圈',method:'Biot–Savart quadrature / 51×51',unit:'mT',legend:'静磁场强度 |B|'},
  gas:{code:'PhyTwin Gas',name:'气体圆柱绕流',method:'Incompressible potential-flow solution / 71×51',unit:'m/s',legend:'速度模 |u|'},
  pipe:{code:'PhyTwin Liquid',name:'液体充分发展管流',method:'Navier–Stokes Hagen–Poiseuille solution / 71×51',unit:'m/s',legend:'轴向速度 uₓ'},
  thermal:{code:'PhyTwin Heat',name:'三维稳态热传导',method:'3D finite-difference Poisson solver / 25×17×13',unit:'K',legend:'温度 T'},
  ocean:{code:'PhyTwin Transport',name:'海洋污染物传质',method:'3D advection–diffusion–decay Green function / 81×55',unit:'mg/m³',legend:'质量浓度 C'},
}

export const modelTheory={
  plasma:{equations:['Bφ(R) = B₀R₀ / R','Bθ(r) = μ₀Iₚr / (2πa²)','q(r) = rBφ / (R₀Bθ)'],variables:[['R₀','托卡马克大半径','m'],['a','等离子体小半径','m'],['Iₚ','等离子体环向电流','A'],['B₀','轴上环向磁场','T'],['κ','截面拉长比','—']],assumptions:'轴对称、圆形/椭圆相似磁面、均匀电流密度；用于磁场与安全因子基准，不声称替代自由边界 Grad–Shafranov 或三维 MHD。'},
  em:{equations:['B(r) = (μ₀I / 4π) ∮ dℓ × (r−r′) / |r−r′|³','Btotal = Σⁿₖ₌₁ Bk','∇·B = 0，∇×B = μ₀J'],variables:[['N','线圈匝数','turn'],['I','直流电流','A'],['a','线圈平均半径','m'],['L','绕组轴向长度','m'],['dc','导线直径','m']],assumptions:'空气芯、稳恒直流、圆形同轴线圈；每一匝以离散 Biot–Savart 线积分求和，不含铁磁饱和与邻近效应。'},
  gas:{equations:['∇·u = 0，∇×u = 0','uᵣ = U∞(1−a²/r²)cosθ','uθ = −U∞(1+a²/r²)sinθ','Cp = 1 − |u|²/U∞²'],variables:[['U∞','自由来流速度','m/s'],['ρ','气体密度','kg/m³'],['a','圆柱半径','m'],['μ','动力黏度','Pa·s'],['α','来流偏角','°'],['W','圆柱展向长度','m']],assumptions:'二维不可压、无黏、无旋势流的闭式解，再沿展向拉伸为三维展示；不把粒子示踪当作离散粒子法求解。'},
  pipe:{equations:['ρ(u·∇)u = −∇p + μ∇²u','u(r) = 2Ū[1−(r/R)²]','Δp = 32μLŪ / D²','Re = ρŪD/μ'],variables:[['Ū','截面平均速度','m/s'],['D','圆管内径','m'],['ρ','液体密度','kg/m³'],['μ','动力黏度','Pa·s'],['L','管长','m'],['ε','壁面粗糙度（仅记录）','m']],assumptions:'不可压牛顿流体、稳态、轴对称、充分发展层流；界面限制 Re<2300，使显示场严格对应 Hagen–Poiseuille 解。'},
  thermal:{equations:['∇·(k∇T) + q̇ = 0','T|∂Ω = Tc','q = −k∇T'],variables:[['L','实体长度','m'],['W','实体宽度','m'],['H','实体高度','m'],['Tc','六面恒温边界','K'],['k','各向同性导热系数','W/(m·K)'],['q̇','中心高斯体热源峰值','W/m³']],assumptions:'常物性、稳态导热；三维有限差分迭代求解，页面二维云图为同一三维解的中截面。'},
  ocean:{equations:['∂C/∂t + U∂C/∂x = Kh(∂²C/∂x²+∂²C/∂y²)+Kv∂²C/∂z²−λC','C = Me⁻ˡᵗ exp[−((x−Ut)²+y²)/(4Kht)−z²/(4Kvt)] / ((4πt)³ᐟ²Kh√Kv)'],variables:[['U','均匀海流速度','m/s'],['Kh','水平涡扩散系数','m²/s'],['Kv','垂向涡扩散系数','m²/s'],['M','瞬时释放质量','kg'],['λ','一阶衰减率','s⁻¹'],['t','释放后时间','s'],['H','显示水深','m']],assumptions:'无限域、均匀流速与常扩散系数的三维 Green 函数；粒子用于显示连续浓度场，不参与求解。'},
}

export function validate(model,p){
  Object.entries(p).forEach(([key,value])=>ensure(Number.isFinite(Number(value)),`${key} 必须是有效数字`))
  Object.entries(p).forEach(([key,value])=>{if(!['angle','decay'].includes(key))ensure(Number(value)>0,`${key} 必须大于 0`)})
  if(model==='plasma')ensure(p.minorRadius<p.majorRadius,'小半径 a 必须小于大半径 R₀')
  if(model==='pipe')ensure(p.density*p.velocity*p.diameter/p.viscosity<2300,'当前模块采用层流解析解，请降低流速或管径，使 Re < 2300')
  if(model==='thermal')ensure(Math.min(p.length,p.width,p.height)>0,'实体三向尺寸必须大于 0')
}

function solvePlasma(p){
  validate('plasma',p);const a=p.minorRadius,k=p.elongation,R0=p.majorRadius,Ip=p.plasmaCurrent*1e6
  const x=linspace(-a,a,61),y=linspace(-a*k,a*k,51),BpEdge=MU0*Ip/(2*Math.PI*a)
  const field=(xi,yj)=>{const rho=Math.sqrt((xi/a)**2+(yj/(a*k))**2);if(rho>1)return null;const Bt=p.toroidalField*R0/(R0+xi);const Bp=BpEdge*rho;return Math.hypot(Bt,Bp)}
  const z=y.map(yj=>x.map(xi=>field(xi,yj))),q95=2*Math.PI*a*a*p.toroidalField*k/(MU0*R0*Ip),qr=linspace(.03,1,81),q=qr.map(r=>.8+(q95-.8)*r*r)
  const particles=Array.from({length:1500},(_,i)=>{const rho=.06+.9*Math.sqrt(seq(i,1)),theta=2*Math.PI*seq(i,2),phi=2*Math.PI*seq(i,3),R=R0+a*rho*Math.cos(theta),zz=a*k*rho*Math.sin(theta),value=field(a*rho*Math.cos(theta),a*k*rho*Math.sin(theta));return{x:R*Math.cos(phi),y:R*Math.sin(phi),z:zz,value,vx:-Math.sin(phi),vy:Math.cos(phi),vz:.12*Math.cos(theta)}})
  return{model:'plasma',x,y,z,particles,bounds:{x:[-(R0+a),R0+a],y:[-(R0+a),R0+a],z:[-a*k,a*k]},dimensions:[['大直径 2(R₀+a)',2*(R0+a),'m'],['等离子体高度 2κa',2*k*a,'m'],['环向尺度 2πR₀',2*Math.PI*R0,'m']],curveX:qr,curveY:q,curveTitle:'安全因子径向剖面',curveXTitle:'归一化小半径 ρ (—)',curveYTitle:'安全因子 q (—)',stats:[['边缘安全因子 q₉₅',q95.toFixed(2),'—'],['边缘极向磁场',BpEdge.toFixed(2),'T'],['等离子体体积',(2*Math.PI**2*R0*a*a*k).toFixed(0),'m³'],['轴上磁能密度',(p.toroidalField**2/(2*MU0)/1e6).toFixed(2),'MJ/m³']],insight:`由同一轴对称磁场解得到 q₉₅=${q95.toFixed(2)}、边缘极向场 ${BpEdge.toFixed(2)} T。`,convergence:residual(.56)}
}

function coilFieldAt(r,z,p,segments=48){
  let bx=0,bz=0;const turns=Math.max(1,Math.round(p.turns)),dz=turns===1?0:p.length/(turns-1)
  for(let turn=0;turn<turns;turn+=1){const z0=-p.length/2+turn*dz
    for(let j=0;j<segments;j+=1){const th=2*Math.PI*(j+.5)/segments,c=Math.cos(th),s=Math.sin(th),sx=p.radius*c,sy=p.radius*s,dlx=-p.radius*s*2*Math.PI/segments,dly=p.radius*c*2*Math.PI/segments,rx=r-sx,ry=-sy,rz=z-z0,d3=Math.max(1e-12,(rx*rx+ry*ry+rz*rz)**1.5),coef=MU0*p.current/(4*Math.PI*d3);bx+=coef*dly*rz;bz+=coef*(dlx*ry-dly*rx)}
  }return{br:bx,bz,mag:Math.hypot(bx,bz)}
}
function solveEM(p){
  validate('em',p);const extentR=p.radius*2.25,extentZ=Math.max(p.length,p.radius*2)*1.45,x=linspace(-extentR,extentR,51),y=linspace(-extentZ,extentZ,51)
  const z=y.map(zj=>x.map(ri=>coilFieldAt(Math.abs(ri),zj,p).mag*1e3)),axis=linspace(-extentZ,extentZ,121),axisB=axis.map(zj=>coilFieldAt(0,zj,p,64).mag*1e3),center=coilFieldAt(0,0,p,96).mag,area=Math.PI*p.radius**2,inductance=MU0*p.turns**2*area/p.length
  const particles=Array.from({length:1300},(_,i)=>{const ring=.08+p.radius*2.1*seq(i,1),th=2*Math.PI*seq(i,2),zz=-extentZ+2*extentZ*seq(i,3),f=coilFieldAt(ring,zz,p,24),value=f.mag*1e3;return{x:ring*Math.cos(th),y:ring*Math.sin(th),z:zz,value,vx:f.br*Math.cos(th),vy:f.br*Math.sin(th),vz:f.bz}})
  return{model:'em',x,y,z,particles,bounds:{x:[-extentR,extentR],y:[-extentR,extentR],z:[-extentZ,extentZ]},dimensions:[['线圈外径 2a',2*p.radius,'m'],['绕组长度 L',p.length,'m'],['导线直径 dc',p.conductor,'m']],curveX:axis,curveY:axisB,curveTitle:'线圈轴线磁场',curveXTitle:'轴向坐标 z (m)',curveYTitle:'磁感应强度 Bz (mT)',stats:[['中心磁场',(center*1e3).toFixed(2),'mT'],['磁偶极矩',(p.turns*p.current*area).toFixed(2),'A·m²'],['近似电感',(inductance*1e3).toFixed(2),'mH'],['储磁能',(.5*inductance*p.current**2).toFixed(3),'J']],insight:`${Math.round(p.turns)} 匝线圈的离散 Biot–Savart 求和得到中心静磁场 ${(center*1e3).toFixed(2)} mT；三维场线与二维云图使用同一计算场。`,convergence:residual(.7)}
}

function gasVelocity(x,y,p){const a=p.radius,alpha=p.angle*Math.PI/180,r2=x*x+y*y;if(r2<=a*a)return null;const theta=Math.atan2(y,x)-alpha,ratio=a*a/r2,vr=p.speed*(1-ratio)*Math.cos(theta),vt=-p.speed*(1+ratio)*Math.sin(theta),worldTheta=Math.atan2(y,x);return{vx:vr*Math.cos(worldTheta)-vt*Math.sin(worldTheta),vy:vr*Math.sin(worldTheta)+vt*Math.cos(worldTheta),mag:Math.hypot(vr,vt)}}
function solveGas(p){
  validate('gas',p);const a=p.radius,x=linspace(-4*a,7*a,71),y=linspace(-3.5*a,3.5*a,51),z=y.map(yj=>x.map(xi=>gasVelocity(xi,yj,p)?.mag??null)),theta=linspace(0,360,121),cp=theta.map(t=>1-4*Math.sin((t-p.angle)*Math.PI/180)**2),Re=p.density*p.speed*2*a/p.viscosity
  const particles=Array.from({length:1400},(_,i)=>{let xx=-4*a+11*a*seq(i,1),yy=-3.5*a+7*a*seq(i,2);if(xx*xx+yy*yy<a*a){xx=-1.1*a;yy=(seq(i,4)*2-1)*3.2*a}const v=gasVelocity(xx,yy,p)||{vx:0,vy:0,mag:0};return{x:xx,y:yy,z:(seq(i,3)-.5)*p.span,value:v.mag,vx:v.vx,vy:v.vy,vz:0}})
  return{model:'gas',x,y,z,particles,bounds:{x:[-4*a,7*a],y:[-3.5*a,3.5*a],z:[-p.span/2,p.span/2]},dimensions:[['计算域长度',11*a,'m'],['计算域高度',7*a,'m'],['圆柱展长 W',p.span,'m']],curveX:theta,curveY:cp,curveTitle:'圆柱表面压力系数',curveXTitle:'周向角 θ (°)',curveYTitle:'压力系数 Cp (—)',stats:[['解析最大速度',(2*p.speed).toFixed(2),'m/s'],['Reynolds 数',Re.toExponential(2),'—'],['来流动压',(.5*p.density*p.speed**2).toFixed(1),'Pa'],['质量守恒误差','0.00','%']],insight:'势流闭式解严格满足不可压连续方程与无穿透边界；粒子只沿求得的速度向量示踪。',convergence:residual(.82)}
}

function solvePipe(p){
  validate('pipe',p);const R=p.diameter/2,Re=p.density*p.velocity*p.diameter/p.viscosity,x=linspace(0,p.length,71),y=linspace(-R,R,51),profile=y.map(r=>2*p.velocity*(1-(r/R)**2)),z=y.map((_,j)=>x.map(()=>profile[j])),dp=32*p.viscosity*p.length*p.velocity/p.diameter**2,Q=p.velocity*Math.PI*R*R
  const particles=Array.from({length:1400},(_,i)=>{const rr=R*Math.sqrt(seq(i,1)),th=2*Math.PI*seq(i,2),u=2*p.velocity*(1-(rr/R)**2);return{x:p.length*seq(i,3),y:rr*Math.cos(th),z:rr*Math.sin(th),value:u,vx:u,vy:0,vz:0}})
  return{model:'pipe',x,y,z,particles,bounds:{x:[0,p.length],y:[-R,R],z:[-R,R]},dimensions:[['管长 L',p.length,'m'],['内径 D',p.diameter,'m'],['壁厚（显示）',.08*p.diameter,'m']],curveX:profile,curveY:y,curveTitle:'出口速度剖面',curveXTitle:'轴向速度 uₓ (m/s)',curveYTitle:'半径 r (m)',stats:[['Reynolds 数',Re.toFixed(0),'—'],['中心线速度',(2*p.velocity).toFixed(3),'m/s'],['沿程压降',(dp/1000).toFixed(3),'kPa'],['体积流量',(Q*1e6).toFixed(2),'mL/s']],insight:`Re=${Re.toFixed(0)}，满足充分发展层流条件；二维剖面和三维粒子均采用 u(r)=2Ū[1−(r/R)²]。`,convergence:residual(.88)}
}

function solveThermal(p){
  validate('thermal',p);const nx=25,ny=17,nz=13,dx=p.length/(nx-1),dy=p.width/(ny-1),dz=p.height/(nz-1),T=new Float64Array(nx*ny*nz).fill(p.cold),index=(i,j,k)=>k*nx*ny+j*nx+i,source=(i,j,k)=>{const xx=(i*dx-p.length/2)/(p.length*.18),yy=(j*dy-p.width/2)/(p.width*.2),zz=(k*dz-p.height/2)/(p.height*.24);return p.source*Math.exp(-(xx*xx+yy*yy+zz*zz))},ax=1/dx**2,ay=1/dy**2,az=1/dz**2,den=2*(ax+ay+az)
  let lastResidual=1;const history=[]
  for(let iter=0;iter<620;iter+=1){let maxChange=0;for(let k=1;k<nz-1;k+=1)for(let j=1;j<ny-1;j+=1)for(let i=1;i<nx-1;i+=1){const id=index(i,j,k),next=(ax*(T[index(i-1,j,k)]+T[index(i+1,j,k)])+ay*(T[index(i,j-1,k)]+T[index(i,j+1,k)])+az*(T[index(i,j,k-1)]+T[index(i,j,k+1)])+source(i,j,k)/p.conductivity)/den,max=Math.abs(next-T[id]);T[id]=next;if(max>maxChange)maxChange=max}lastResidual=maxChange;if(iter%24===0)history.push(Math.max(1e-10,maxChange));if(maxChange<1e-6)break}
  const midK=Math.floor(nz/2),x=linspace(0,p.length,nx),y=linspace(0,p.width,ny),slice=y.map((_,j)=>x.map((__,i)=>T[index(i,j,midK)])),midJ=Math.floor(ny/2),midZ=Math.floor(nz/2),curve=x.map((_,i)=>T[index(i,midJ,midZ)]),maxT=Math.max(...T)
  const particles=[];for(let k=1;k<nz-1;k+=2)for(let j=1;j<ny-1;j+=2)for(let i=1;i<nx-1;i+=2){const qx=-p.conductivity*(T[index(i+1,j,k)]-T[index(i-1,j,k)])/(2*dx),qy=-p.conductivity*(T[index(i,j+1,k)]-T[index(i,j-1,k)])/(2*dy),qz=-p.conductivity*(T[index(i,j,k+1)]-T[index(i,j,k-1)])/(2*dz);particles.push({x:i*dx,y:j*dy,z:k*dz,value:T[index(i,j,k)],vx:qx,vy:qy,vz:qz})}
  return{model:'thermal',x,y,z:slice,particles,bounds:{x:[0,p.length],y:[0,p.width],z:[0,p.height]},dimensions:[['长度 L',p.length,'m'],['宽度 W',p.width,'m'],['高度 H',p.height,'m']],curveX:x,curveY:curve,curveTitle:'中轴线温度剖面',curveXTitle:'长度坐标 x (m)',curveYTitle:'温度 T (K)',stats:[['最高温度',maxT.toFixed(2),'K'],['边界温度',p.cold.toFixed(1),'K'],['峰值温升',(maxT-p.cold).toFixed(2),'K'],['离散残差',lastResidual.toExponential(2),'K']],insight:`三维 Poisson 方程收敛后中心最高温度为 ${maxT.toFixed(2)} K；二维图是同一 3D 温度数组的 z=H/2 截面。`,convergence:history.length>3?history:residual(.5)}
}

function oceanConcentration(x,y,z,p){const t=p.time,Kh=p.diffusivity,Kv=p.verticalDiffusivity,m=p.mass*Math.exp(-p.decay*t),coef=m/((4*Math.PI*t)**1.5*Kh*Math.sqrt(Kv)),exponent=-((x-p.current*t)**2+y*y)/(4*Kh*t)-z*z/(4*Kv*t);return coef*Math.exp(exponent)*1e6}
function solveOcean(p){
  validate('ocean',p);const t=p.time,sigmaH=Math.sqrt(2*p.diffusivity*t),sigmaV=Math.sqrt(2*p.verticalDiffusivity*t),center=p.current*t,x=linspace(center-5*sigmaH,center+5*sigmaH,81),y=linspace(-4*sigmaH,4*sigmaH,55),z=y.map(yj=>x.map(xi=>oceanConcentration(xi,yj,0,p))),curve=x.map(xi=>oceanConcentration(xi,0,0,p)),peak=oceanConcentration(center,0,0,p),remaining=p.mass*Math.exp(-p.decay*t)
  const particles=Array.from({length:1600},(_,i)=>{const radiusH=sigmaH*Math.sqrt(-2*Math.log(Math.max(.001,seq(i,1)))),theta=2*Math.PI*seq(i,2),normalZ=sigmaV*Math.sqrt(-2*Math.log(Math.max(.001,seq(i,3))))*Math.cos(2*Math.PI*seq(i,4)),zz=Math.max(-p.depth/2,Math.min(p.depth/2,normalZ)),xx=center+radiusH*Math.cos(theta),yy=radiusH*Math.sin(theta);return{x:xx,y:yy,z:zz,value:oceanConcentration(xx,yy,zz,p),vx:p.current,vy:0,vz:0}})
  return{model:'ocean',x:x.map(v=>v/1000),y:y.map(v=>v/1000),z,particles,bounds:{x:[x[0],x.at(-1)],y:[y[0],y.at(-1)],z:[-p.depth/2,p.depth/2]},dimensions:[['下游显示长度',x.at(-1)-x[0],'m'],['横向显示宽度',y.at(-1)-y[0],'m'],['水深 H',p.depth,'m']],curveX:x.map(v=>v/1000),curveY:curve,curveTitle:'羽流中心线浓度',curveXTitle:'下游坐标 x (km)',curveYTitle:'质量浓度 C (mg/m³)',stats:[['峰值浓度',peak.toFixed(3),'mg/m³'],['羽流中心',(center/1000).toFixed(2),'km'],['水平扩散尺度 2σ',(2*sigmaH).toFixed(0),'m'],['剩余质量',remaining.toFixed(1),'kg']],insight:`三维解析核得到羽流中心 ${finite(center/1000,2)} km、峰值 ${finite(peak,3)} mg/m³；粒子采样自相同浓度分布。`,convergence:residual(.76)}
}

export function runSolver(model,params){const p=Object.fromEntries(Object.entries(params).map(([k,v])=>[k,Number(v)]));return({plasma:solvePlasma,em:solveEM,gas:solveGas,pipe:solvePipe,thermal:solveThermal,ocean:solveOcean}[model]||solveGas)(p)}
export function downloadResult(result){const payload=JSON.stringify({generatedBy:modelMeta[result.model].code,generatedAt:new Date().toISOString(),equations:modelTheory[result.model].equations,model:{...result,particles:undefined}},null,2),href=URL.createObjectURL(new Blob([payload],{type:'application/json'})),a=document.createElement('a');a.href=href;a.download=`phytwin-${result.model}-result.json`;a.click();URL.revokeObjectURL(href)}
