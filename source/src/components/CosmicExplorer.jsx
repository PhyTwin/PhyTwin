import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Crosshair, Maximize2, MousePointer2, Rotate3D, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

// 星座是地球视角中的方向图案，而不是银河盘上的封闭区域。
// 总览中的坐标用于表达从太阳系看去的近似方向；点击后展示主要恒星的局部三维结构。
const OBJECTS = {
  solar: { index:'01', kind:'LOCAL SYSTEM', name:'太阳系', latin:'Solar System', x:2.07, y:-.92, screen:[61,57], distance:'距银心约 26,000 光年', metric:'GALACTIC RADIUS', value:'≈ 26,000 ly', description:'太阳位于猎户臂附近。放大后可观察八大行星公转与自转；轨道半径和速度经过视觉压缩，不代表真实比例。' },
  lyra: { index:'02', kind:'CONSTELLATION', name:'天琴座', latin:'Lyra', x:2.22, y:.22, screen:[65,43], metric:'ANCHOR STAR', value:'Vega · 25 ly', description:'以织女星为主星的北天小星座。放大视图保留主要恒星的相对拓扑，并用深度差提示它们并不位于同一平面。' },
  draco: { index:'03', kind:'CONSTELLATION', name:'天龙座', latin:'Draco', x:.72, y:1.18, screen:[53,32], metric:'BRIGHTEST STAR', value:'Eltanin · 2.24 mag', description:'天龙座环绕北天极延展。恒星连线是观测文化图式，局部三维视图展示蜿蜒的主要亮星结构。' },
  orion: { index:'04', kind:'CONSTELLATION', name:'猎户座', latin:'Orion', x:2.76, y:-1.68, screen:[73,67], metric:'ANCHOR STAR', value:'Betelgeuse · 548 ly', description:'猎户座由参宿四、参宿七和醒目的腰带三星构成，是冬季夜空中最易识别的星座之一。' },
  cassiopeia: { index:'05', kind:'CONSTELLATION', name:'仙后座', latin:'Cassiopeia', x:-.52, y:.82, screen:[44,39], metric:'SKY PATTERN', value:'W-shaped asterism', description:'仙后座以明亮的 W 形结构著称。点击后可查看五颗主星的局部空间层次。' },
  cygnus: { index:'06', kind:'CONSTELLATION', name:'天鹅座', latin:'Cygnus', x:1.48, y:.48, screen:[58,46], metric:'ANCHOR STAR', value:'Deneb · ≈ 2,600 ly', description:'天鹅座沿银河背景延展，天津四与十字形主星构成北十字，是银河方向的重要识别标志。' },
}
const GALAXY_INFO={index:'00',kind:'GALACTIC TWIN',name:'银河系',latin:'Milky Way',x:0,y:0,metric:'ESTIMATED DIAMETER',value:'≈ 100,000–120,000 ly',description:'由核球、银盘与四条主要旋臂构成的动态数字孪生。恒星粒子采用随半径变化的角速度，表现银河系差分旋转；比例依据太阳距银心约 26,000 光年进行标定。'}

const CONSTELLATIONS = {
  lyra: { color:0x83d9ff, stars:[[-.8,.6,.0,.13],[.2,.35,.5,.075],[.55,-.55,-.25,.08],[-.35,-.72,.32,.08],[-.25,.08,-.45,.07]], links:[[0,1],[1,2],[2,3],[3,4],[4,1]] },
  draco: { color:0xb6a5ff, stars:[[-1.15,.15,.3,.07],[-.75,.48,-.2,.075],[-.25,.25,.45,.07],[.15,.55,.0,.09],[.52,.28,-.28,.105],[.28,-.1,.25,.07],[-.22,-.5,-.1,.065],[.72,-.55,.38,.06]], links:[[0,1],[1,2],[2,3],[3,4],[4,2],[2,5],[5,6],[6,7]] },
  orion: { color:0x8fc9ff, stars:[[-.65,.78,-.15,.12],[.68,.68,.32,.09],[-.38,.08,.18,.07],[0,0,-.18,.075],[.38,-.08,.25,.07],[-.58,-.82,.4,.11],[.62,-.75,-.25,.13],[.05,-.55,.05,.06]], links:[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[3,7]] },
  cassiopeia: { color:0xffd69b, stars:[[-1.0,.15,.2,.085],[-.5,-.32,-.2,.1],[0,.2,.4,.12],[.5,-.22,-.35,.09],[1,.28,.08,.08]], links:[[0,1],[1,2],[2,3],[3,4]] },
  cygnus: { color:0xb8e7ff, stars:[[0,.95,.2,.13],[0,.35,-.3,.075],[0,-.2,.15,.08],[0,-.9,.4,.09],[-.72,.05,-.2,.07],[.72,.05,.28,.07]], links:[[0,1],[1,2],[2,3],[4,2],[2,5]] },
}

function makeGalaxy() {
  const group = new THREE.Group()
  const count = 13000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const radii = new Float32Array(count)
  const angles = new Float32Array(count)
  const speeds = new Float32Array(count)
  const cool = new THREE.Color('#9cc9ff'); const warm = new THREE.Color('#ffd19e'); const dust = new THREE.Color('#5a7395')
  for (let i=0;i<count;i+=1) {
    const bulge = Math.random() < .16
    const r = bulge ? Math.pow(Math.random(),2.2)*1.3 : Math.pow(Math.random(),.7)*4.35
    const arm = i % 4
    const scatter = (Math.random()-.5) * (.28 + r*.055)
    const theta = bulge ? Math.random()*Math.PI*2 : arm*Math.PI/2 + r*1.62 + scatter
    radii[i]=r; angles[i]=theta; speeds[i]=.82+Math.random()*.36
    positions[i*3+2]=(Math.random()-.5)*(bulge?.55:.12*(4.6-r))
    const c = bulge ? warm.clone().lerp(cool,.18) : cool.clone().lerp(dust,Math.random()*.35).offsetHSL((Math.random()-.5)*.035,0,(Math.random()-.5)*.13)
    colors.set([c.r,c.g,c.b],i*3)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3)); geometry.setAttribute('color',new THREE.BufferAttribute(colors,3)); geometry.setAttribute('aRadius',new THREE.BufferAttribute(radii,1)); geometry.setAttribute('aAngle',new THREE.BufferAttribute(angles,1)); geometry.setAttribute('aSpeed',new THREE.BufferAttribute(speeds,1))
  const material = new THREE.ShaderMaterial({ transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexColors:true,uniforms:{time:{value:0},pointScale:{value:48*Math.min(devicePixelRatio||1,2)}},vertexShader:`
    attribute float aRadius; attribute float aAngle; attribute float aSpeed; varying vec3 vColor; uniform float time; uniform float pointScale;
    void main(){float omega=(.11/(.52+aRadius))*aSpeed;float a=aAngle+time*omega;vec3 p=position;p.x=cos(a)*aRadius;p.y=sin(a)*aRadius;vColor=color;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(pointScale/max(1.,-mv.z),1.,5.5);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`varying vec3 vColor;void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;gl_FragColor=vec4(vColor,smoothstep(.5,.04,d)*.9);}` })
  group.add(new THREE.Points(geometry,material))
  const core = new THREE.Mesh(new THREE.SphereGeometry(.38,24,16),new THREE.MeshBasicMaterial({color:0xffd2a1,transparent:true,opacity:.62,blending:THREE.AdditiveBlending}))
  core.scale.z=.35; group.add(core); group.userData.flowMaterial=material
  return group
}

function makeBackground() {
  const count=1800, positions=new Float32Array(count*3), colors=new Float32Array(count*3)
  for(let i=0;i<count;i+=1){positions.set([(Math.random()-.5)*28,(Math.random()-.5)*18,-3-Math.random()*7],i*3);const c=.35+Math.random()*.55;colors.set([c*.72,c*.82,c],i*3)}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.BufferAttribute(colors,3))
  return new THREE.Points(geometry,new THREE.PointsMaterial({size:.025,vertexColors:true,transparent:true,opacity:.78,depthWrite:false,blending:THREE.AdditiveBlending}))
}

function orbitLine(radius) {
  const points=Array.from({length:97},(_,i)=>new THREE.Vector3(Math.cos(i/96*Math.PI*2)*radius,Math.sin(i/96*Math.PI*2)*radius,0))
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x6d91ac,transparent:true,opacity:.2}))
}

function makeSolarSystem() {
  const group=new THREE.Group(); const sun=new THREE.Mesh(new THREE.SphereGeometry(.16,28,18),new THREE.MeshBasicMaterial({color:0xffd177})); group.add(sun)
  const specs=[[.25,.026,0x9b8f84,1.8],[.35,.04,0xd7a66d,1.35],[.47,.044,0x4f91d9,1],[.59,.034,0xc65e42,.8],[.79,.095,0xd7aa79,.43],[1.02,.082,0xe2c18c,.32],[1.24,.063,0x82c4d5,.23],[1.43,.059,0x5177c7,.18]]
  const planets=[]
  specs.forEach(([radius,size,color,speed],i)=>{group.add(orbitLine(radius));const mesh=new THREE.Mesh(new THREE.SphereGeometry(size,18,12),new THREE.MeshStandardMaterial({color,roughness:.75,metalness:.05}));mesh.userData={radius,speed,phase:i*.83,spin:.014+i*.006};group.add(mesh);planets.push(mesh);if(i===5){const ring=new THREE.Mesh(new THREE.RingGeometry(size*1.35,size*2.05,30),new THREE.MeshBasicMaterial({color:0xd5bf95,side:THREE.DoubleSide,transparent:true,opacity:.62}));ring.rotation.x=1.15;mesh.add(ring)}})
  group.userData.planets=planets;group.userData.sun=sun;return group
}

function makeConstellation(id) {
  const data=CONSTELLATIONS[id], group=new THREE.Group(), points=data.stars.map(([x,y,z])=>new THREE.Vector3(x,y,z))
  data.links.forEach(([a,b])=>group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([points[a],points[b]]),new THREE.LineBasicMaterial({color:data.color,transparent:true,opacity:.52,blending:THREE.AdditiveBlending}))))
  data.stars.forEach(([x,y,z,size],i)=>{const star=new THREE.Mesh(new THREE.SphereGeometry(size,16,12),new THREE.MeshBasicMaterial({color:i===0?0xffffff:data.color}));star.position.set(x,y,z);group.add(star);const halo=new THREE.Mesh(new THREE.SphereGeometry(size*2.4,12,8),new THREE.MeshBasicMaterial({color:data.color,transparent:true,opacity:.1,blending:THREE.AdditiveBlending}));halo.position.copy(star.position);group.add(halo)})
  return group
}

export default function CosmicExplorer() {
  const hostRef=useRef(null);const [selected,setSelected]=useState(null);const selectedRef=useRef(null);const [ready,setReady]=useState(false)
  useEffect(()=>{selectedRef.current=selected},[selected])
  useEffect(()=>{
    const host=hostRef.current,renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setClearColor(0x010207,1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));host.appendChild(renderer.domElement)
    const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x010207,.02);const camera=new THREE.PerspectiveCamera(42,1,.1,100);camera.position.set(0,0,11)
    scene.add(new THREE.AmbientLight(0x8ebcff,1.8));const light=new THREE.PointLight(0xffd79b,8,12);light.position.set(0,0,3);scene.add(light)
    const background=makeBackground();scene.add(background);const galaxy=makeGalaxy();scene.add(galaxy)
    const localGroups={solar:makeSolarSystem()};Object.keys(CONSTELLATIONS).forEach(id=>{localGroups[id]=makeConstellation(id)})
    Object.entries(localGroups).forEach(([id,g])=>{g.position.set(OBJECTS[id].x,OBJECTS[id].y,.18);g.scale.setScalar(.001);scene.add(g)})
    const markerMeshes={};Object.entries(OBJECTS).forEach(([id,o])=>{const marker=new THREE.Mesh(new THREE.RingGeometry(.045,.075,24),new THREE.MeshBasicMaterial({color:id==='solar'?0x71ecff:0xa9c4ff,side:THREE.DoubleSide,transparent:true,opacity:.9}));marker.position.set(o.x,o.y,.12);scene.add(marker);markerMeshes[id]=marker})
    const resize=()=>{const rect=host.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix()};const observer=new ResizeObserver(resize);observer.observe(host);resize()
    const mouse={down:false,lastX:0,lastY:0,dragX:0,dragY:0,zoom:0};const onDown=e=>{mouse.down=true;mouse.lastX=e.clientX;mouse.lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)};const onMove=e=>{if(mouse.down&&selectedRef.current){mouse.dragX+=(e.clientX-mouse.lastX)*.006;mouse.dragY+=(e.clientY-mouse.lastY)*.005;mouse.lastX=e.clientX;mouse.lastY=e.clientY}};const onUp=()=>{mouse.down=false};const onWheel=e=>{if(selectedRef.current){e.preventDefault();mouse.zoom=Math.max(-1.4,Math.min(1.8,mouse.zoom+e.deltaY*.0025))}}
    renderer.domElement.addEventListener('pointerdown',onDown);renderer.domElement.addEventListener('pointermove',onMove);renderer.domElement.addEventListener('pointerup',onUp);renderer.domElement.addEventListener('pointercancel',onUp);renderer.domElement.addEventListener('wheel',onWheel,{passive:false})
    let frame=0,start=performance.now();setReady(true)
    const animate=()=>{frame=requestAnimationFrame(animate);const t=(performance.now()-start)/1000,active=selectedRef.current,target=active?(active==='galaxy'?GALAXY_INFO:OBJECTS[active]):null
      galaxy.userData.flowMaterial.uniforms.time.value=t;background.rotation.z=t*.002
      camera.position.x=THREE.MathUtils.lerp(camera.position.x,target?target.x:0,.045);camera.position.y=THREE.MathUtils.lerp(camera.position.y,target?target.y:0,.045);camera.position.z=THREE.MathUtils.lerp(camera.position.z,target?4.25+mouse.zoom:11,.045);camera.lookAt(camera.position.x,camera.position.y,0)
      Object.entries(localGroups).forEach(([id,g])=>{const shown=id===active,targetScale=shown?(id==='solar'?1.08:1.22):.001;const s=THREE.MathUtils.lerp(g.scale.x,targetScale,.065);g.scale.setScalar(s);g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,shown?mouse.dragY:0,.06);g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,shown?mouse.dragX:0,.06);if(shown&&id!=='solar')g.rotation.z+=.0008})
      const solar=localGroups.solar;solar.userData.sun.rotation.y+=.006;solar.userData.planets.forEach(p=>{const a=p.userData.phase+t*p.userData.speed;p.position.set(Math.cos(a)*p.userData.radius,Math.sin(a)*p.userData.radius,0);p.rotation.y+=p.userData.spin})
      Object.entries(markerMeshes).forEach(([id,m])=>{m.visible=!active;m.rotation.z=t*(id==='solar'?.5:.22);const pulse=1+Math.sin(t*2+OBJECTS[id].index)*.13;m.scale.setScalar(pulse)})
      galaxy.scale.setScalar(THREE.MathUtils.lerp(galaxy.scale.x,active&&active!=='galaxy'?.78:active==='galaxy'?1.18:1,.04));renderer.render(scene,camera)};animate()
    return()=>{cancelAnimationFrame(frame);observer.disconnect();renderer.domElement.removeEventListener('pointerdown',onDown);renderer.domElement.removeEventListener('pointermove',onMove);renderer.domElement.removeEventListener('pointerup',onUp);renderer.domElement.removeEventListener('pointercancel',onUp);renderer.domElement.removeEventListener('wheel',onWheel);scene.traverse(o=>{o.geometry?.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material?.dispose()});renderer.dispose();renderer.domElement.remove()}
  },[])
  const current=selected?(selected==='galaxy'?GALAXY_INFO:OBJECTS[selected]):null
  return <div className={selected?'cosmic-explorer selected':'cosmic-explorer'}>
    <div className="cosmic-canvas" ref={hostRef}/>{!ready&&<div className="cosmic-loader"><i/><span>生成银河系旋臂…</span></div>}<div className="cosmic-grid"/>
    <div className="cosmic-status"><span/><b>MILKY WAY / FACE-ON</b><em>SPIRAL ARM DYNAMICS · INTERACTIVE MAP</em></div>
    {!selected&&<><div className="cosmic-copy"><span>PHYTWIN / COMPUTABLE UNIVERSE</span><h1>PhyTwin<br/>让宇宙成为可计算的孪生。</h1><p>给我们足够的算力，我们能模拟一颗行星、一座星系，乃至整个宇宙。也许真实世界本身，就运行在某个更高维度的数字孪生里。</p><div><button onClick={()=>setSelected('galaxy')}>放大银河系<Maximize2 size={15}/></button><Link to="/lab">进入实时实验室<ArrowRight size={15}/></Link></div></div>
      <div className="galaxy-marker-layer"><div className="galactic-center-label"><i/><span>银河系中心<small>GALACTIC CENTER · 0 ly</small></span></div><div className="solar-distance-ruler"><span>≈ 26,000 ly</span></div>{Object.entries(OBJECTS).map(([id,item])=><button key={id} className={`galaxy-marker ${id==='solar'?'solar':''}`} style={{left:`${item.screen[0]}%`,top:`${item.screen[1]}%`}} onClick={()=>setSelected(id)}><i/><span><small>{item.kind}</small><b>{item.name}</b>{item.distance&&<em>{item.distance}</em>}</span><Crosshair size={13}/></button>)}</div>
      <a className="cosmic-scroll" href="#capability-map"><ArrowDown size={14}/><span>SCROLL TO ENGINEERING SCALE</span></a></>}
    {selected&&current&&<><button className="cosmic-close" onClick={()=>{setSelected(null)}}><X size={17}/>返回银河系俯视图</button><div className="cosmic-detail"><span>{current.kind} / {current.index}</span><h2>{current.name}<small>{current.latin}</small></h2><p>{current.description}</p><div className="cosmic-detail-metric"><span>{current.metric}</span><b>{current.value}</b></div><div className="cosmic-controls-hint"><Rotate3D size={15}/><span>{selected==='galaxy'?'旋臂正在差分旋转':'拖动旋转局部结构'}</span><MousePointer2 size={14}/><span>滚轮缩放</span></div></div><div className="cosmic-model-note"><b>{selected==='galaxy'?'DIFFERENTIAL ROTATION':selected==='solar'?'ORBITAL MOTION':'CONSTELLATION PROJECTION'}</b><span>{selected==='galaxy'?'旋臂粒子角速度随银心半径变化；太阳系标定半径约为 26,000 光年。':selected==='solar'?'行星具有独立自转与公转动画；为保证可读性，尺寸、距离与周期均采用视觉压缩。':'星座是从地球看到的方向图案，不是银河中的物理分区；总览标记为观测方向投影。'}</span></div></>}
    <div className="cosmic-data-note">MILKY WAY · PROCEDURAL FOUR-ARM MODEL<br/>CONSTELLATIONS · EARTH-VIEWED DIRECTION PROJECTION</div>
  </div>
}
