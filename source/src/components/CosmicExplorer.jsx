import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Crosshair, Maximize2, MousePointer2, Rotate3D, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

// 首页目标位置严格采用用户提供的 yh.png 俯视布局：太阳系在下方猎户臂，
// 天琴座参考点位于右上方，天龙矮星系位于银河盘右侧外缘；不显示角度。
const GALAXY_ROTATION_RATE = Math.PI * 2 / (12 * 60 * 60)

const OBJECTS = {
  solar: { index:'01', kind:'LOCAL SYSTEM', name:'太阳系位置', latin:'Solar System · Orion Spur', x:-.34, y:-2.04, z:0, markerColor:'#ffd500', markerHex:0xffd500, labelOffset:[34,42], distance:'距离银心约 26,000 光年', metric:'GALACTOCENTRIC DISTANCE', value:'≈ 26,000 ly', description:'太阳系按参考图固定在银河中心下方的猎户座旋臂（本地臂）区域。放大后可观察八大行星公转与自转；轨道半径和速度为交互展示做了视觉压缩。' },
  lyra: { index:'02', kind:'REFERENCE POSITION', name:'天琴座位置', latin:'Lyra · Reference marker', x:1.22, y:1.58, z:0, markerColor:'#db62ef', markerHex:0xdb62ef, labelOffset:[46,-18], distance:'距离银心约 25,000 光年', metric:'GALACTOCENTRIC DISTANCE', value:'≈ 25,000 ly', description:'天琴座目标按照 yh.png 的银河俯视参考位置固定在右上方，并随整张银河盘共同缓慢旋转。此处是俯视示意锚点，不显示角度。' },
  draco: { index:'03', kind:'SATELLITE GALAXY', name:'天龙矮星系位置', latin:'Draco Dwarf Galaxy · Reference marker', x:4.76, y:.06, z:0, markerColor:'#8ee65e', markerHex:0x8ee65e, labelOffset:[42,2], distance:'距离银心约 60,000 光年', metric:'GALACTOCENTRIC DISTANCE', value:'≈ 60,000 ly', description:'绿色目标按照 yh.png 固定在银河盘右侧外缘，并明确标注为“天龙矮星系”，不再与天龙座混称。位置与恒星纹理绑定在同一银河坐标框架。' },
}
const GALAXY_INFO={index:'00',kind:'GALACTIC TWIN',name:'银河系',latin:'Milky Way · Face-on reference',x:0,y:0,metric:'ESTIMATED DIAMETER',value:'≈ 100,000–120,000 ly',description:'这是一张固定旋臂的银河系俯视参考图：中央棒状结构、主要旋臂与猎户臂不会随时间漂移。太阳系位置按距银心约 26,000 光年标定；银河系真实旋臂结构仍在持续测量与修订中。'}

const CONSTELLATIONS = {
  lyra: { color:0x83d9ff, stars:[[-.8,.6,.0,.13],[.2,.35,.5,.075],[.55,-.55,-.25,.08],[-.35,-.72,.32,.08],[-.25,.08,-.45,.07]], links:[[0,1],[1,2],[2,3],[3,4],[4,1]] },
}

function makeGalaxy() {
  const group=new THREE.Group();let seed=48271
  const random=()=>{seed=seed*16807%2147483647;return (seed-1)/2147483646}
  const count=15000,positions=new Float32Array(count*3),colors=new Float32Array(count*3)
  const ice=new THREE.Color('#a8d8ff'),blue=new THREE.Color('#557eb8'),warm=new THREE.Color('#ffd29a')
  const armPoint=(arm,t,radialNoise=0,angularNoise=0)=>{const sweep=.2+t*9.4,theta=sweep+arm*Math.PI/2+angularNoise,r=.68+sweep*.39+radialNoise;return new THREE.Vector3(Math.cos(theta)*r,Math.sin(theta)*r,0)}
  for(let i=0;i<count;i+=1){
    const bulge=i<count*.18;let point,color
    if(bulge){const r=Math.pow(random(),2.1)*1.18,theta=random()*Math.PI*2;point=new THREE.Vector3(Math.cos(theta)*r,Math.sin(theta)*r,(random()-.5)*.36*(1-r/1.3));color=warm.clone().lerp(ice,.18+random()*.2)}
    else {const t=Math.pow(random(),.82),arm=i%4,spread=(random()-.5)*(.16+t*.15),twist=(random()-.5)*(.09+t*.05);point=armPoint(arm,t,spread,twist);point.z=(random()-.5)*.09*(1-t*.7);color=ice.clone().lerp(blue,.12+random()*.48).offsetHSL((random()-.5)*.025,0,(random()-.5)*.12)}
    positions.set([point.x,point.y,point.z],i*3);colors.set([color.r,color.g,color.b],i*3)
  }
  const stars=new THREE.BufferGeometry();stars.setAttribute('position',new THREE.BufferAttribute(positions,3));stars.setAttribute('color',new THREE.BufferAttribute(colors,3))
  group.add(new THREE.Points(stars,new THREE.PointsMaterial({size:.026,vertexColors:true,transparent:true,opacity:.84,depthWrite:false,blending:THREE.AdditiveBlending,sizeAttenuation:true})))
  for(let arm=0;arm<4;arm+=1){const curve=Array.from({length:260},(_,i)=>armPoint(arm,i/259));group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve),new THREE.LineBasicMaterial({color:arm%2?0x6d9ed4:0x86c8ff,transparent:true,opacity:arm%2?.16:.24,blending:THREE.AdditiveBlending})))}
  // 猎户臂（本地臂）经过太阳系锚点 x=2.07，位于人马臂与英仙臂之间。
  const localCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-1.08,-2.7,.018),new THREE.Vector3(-.34,-2.04,.018),new THREE.Vector3(.48,-1.24,.018)])
  const localArm=localCurve.getPoints(109)
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(localArm),new THREE.LineBasicMaterial({color:0x71e5ff,transparent:true,opacity:.48,blending:THREE.AdditiveBlending})))
  const bar=new THREE.Mesh(new THREE.SphereGeometry(.54,36,20),new THREE.MeshBasicMaterial({color:0xffd7a3,transparent:true,opacity:.55,blending:THREE.AdditiveBlending}));bar.scale.set(2.15,.62,.28);bar.rotation.z=.38;group.add(bar)
  ;[1.2,2.39,3.59].forEach(r=>{const ring=orbitLine(r);ring.material.color.set(0x597390);ring.material.opacity=.1;group.add(ring)})
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

function makeDwarfGalaxy() {
  const group=new THREE.Group(),geometry=new THREE.BufferGeometry(),positions=new Float32Array(900),colors=new Float32Array(900);let seed=7919
  const random=()=>{seed=seed*48271%2147483647;return seed/2147483647}
  for(let i=0;i<300;i+=1){const radius=Math.pow(random(),1.8),theta=random()*Math.PI*2;positions.set([Math.cos(theta)*radius,Math.sin(theta)*radius*.56,(random()-.5)*.22],i*3);const glow=.5+random()*.5;colors.set([.48*glow,.9*glow,.38*glow],i*3)}
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));group.add(new THREE.Points(geometry,new THREE.PointsMaterial({size:.045,vertexColors:true,transparent:true,opacity:.8,depthWrite:false,blending:THREE.AdditiveBlending})));return group
}

function GalaxyAnchorLayer({ expanded=false, onSelect, anchorRefs, rulerRef }) {
  return <div className={expanded?'galaxy-marker-layer expanded':'galaxy-marker-layer'}>
    <div className="galactic-center-label"><i/><span>银河系中心<small>GALACTIC CENTER · 0 ly</small></span></div>
    <div className="solar-distance-ruler" ref={rulerRef}><span>太阳系银心距 · ≈ 26,000 ly</span></div>
    {Object.entries(OBJECTS).map(([id,item])=>{
      const [labelX,labelY]=item.labelOffset
      const leaderLength=Math.hypot(labelX,labelY)
      const leaderAngle=Math.atan2(labelY,labelX)*180/Math.PI
      return <div
        key={id}
        ref={node=>{anchorRefs.current[id]=node}}
        className={`galaxy-anchor ${id}`}
        style={{'--label-x':`${labelX}px`,'--label-y':`${labelY}px`,'--leader-length':`${leaderLength}px`,'--leader-angle':`${leaderAngle}deg`,'--anchor-color':item.markerColor}}
      >
        <i className="anchor-dot"/>
        <i className="anchor-leader"/>
        <button className="galaxy-marker" onClick={()=>onSelect(id)}>
          <span><small>{item.kind}</small><b>{item.name}</b><em>{item.distance}</em></span><Crosshair size={13}/>
        </button>
      </div>
    })}
  </div>
}

export default function CosmicExplorer() {
  const hostRef=useRef(null);const anchorRefs=useRef({});const rulerRef=useRef(null);const [selected,setSelected]=useState(null);const selectedRef=useRef(null);const [ready,setReady]=useState(false)
  useEffect(()=>{selectedRef.current=selected},[selected])
  useEffect(()=>{
    const host=hostRef.current,renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setClearColor(0x010207,1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));host.appendChild(renderer.domElement)
    const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x010207,.02);const camera=new THREE.PerspectiveCamera(42,1,.1,100);camera.position.set(0,0,11)
    scene.add(new THREE.AmbientLight(0x8ebcff,1.8));const light=new THREE.PointLight(0xffd79b,8,12);light.position.set(0,0,3);scene.add(light)
    const background=makeBackground();scene.add(background);const galacticFrame=new THREE.Group(),galaxy=makeGalaxy();galacticFrame.add(galaxy);scene.add(galacticFrame)
    const localGroups={solar:makeSolarSystem(),draco:makeDwarfGalaxy()};Object.keys(CONSTELLATIONS).forEach(id=>{localGroups[id]=makeConstellation(id)})
    Object.entries(localGroups).forEach(([id,g])=>{g.position.set(OBJECTS[id].x,OBJECTS[id].y,(OBJECTS[id].z||0)+.18);g.scale.setScalar(.001);galacticFrame.add(g)})
    const markerMeshes={};Object.entries(OBJECTS).forEach(([id,o])=>{const marker=new THREE.Mesh(new THREE.RingGeometry(.045,.075,24),new THREE.MeshBasicMaterial({color:o.markerHex,side:THREE.DoubleSide,transparent:true,opacity:.94}));marker.position.set(o.x,o.y,(o.z||0)+.12);galacticFrame.add(marker);markerMeshes[id]=marker})
    const resize=()=>{const rect=host.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix()};const observer=new ResizeObserver(resize);observer.observe(host);resize()
    const mouse={down:false,lastX:0,lastY:0,dragX:0,dragY:0,zoom:0};const onDown=e=>{mouse.down=true;mouse.lastX=e.clientX;mouse.lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)};const onMove=e=>{if(mouse.down&&selectedRef.current){mouse.dragX+=(e.clientX-mouse.lastX)*.006;mouse.dragY+=(e.clientY-mouse.lastY)*.005;mouse.lastX=e.clientX;mouse.lastY=e.clientY}};const onUp=()=>{mouse.down=false};const onWheel=e=>{if(selectedRef.current){e.preventDefault();mouse.zoom=Math.max(-1.4,Math.min(1.8,mouse.zoom+e.deltaY*.0025))}}
    renderer.domElement.addEventListener('pointerdown',onDown);renderer.domElement.addEventListener('pointermove',onMove);renderer.domElement.addEventListener('pointerup',onUp);renderer.domElement.addEventListener('pointercancel',onUp);renderer.domElement.addEventListener('wheel',onWheel,{passive:false})
    let frame=0,start=performance.now();setReady(true)
    const animate=()=>{frame=requestAnimationFrame(animate);const t=(performance.now()-start)/1000,active=selectedRef.current,target=active?(active==='galaxy'?GALAXY_INFO:OBJECTS[active]):null
      // 银河盘、旋臂、恒星与所有空间锚点共享同一坐标框架，只进行极慢的刚体旋转。
      galacticFrame.rotation.z=t*GALAXY_ROTATION_RATE
      galacticFrame.rotation.x=THREE.MathUtils.lerp(galacticFrame.rotation.x,active==='galaxy'?mouse.dragY:0,.055);galacticFrame.rotation.y=THREE.MathUtils.lerp(galacticFrame.rotation.y,active==='galaxy'?mouse.dragX:0,.055)
      const frameScale=active&&active!=='galaxy'?.78:active==='galaxy'?1.1:1;galacticFrame.scale.setScalar(THREE.MathUtils.lerp(galacticFrame.scale.x,frameScale,.04));scene.updateMatrixWorld(true)
      const targetPoint=new THREE.Vector3(target?.x||0,target?.y||0,target?.z||0);if(active&&active!=='galaxy')targetPoint.applyMatrix4(galacticFrame.matrixWorld)
      camera.position.x=THREE.MathUtils.lerp(camera.position.x,targetPoint.x,.045);camera.position.y=THREE.MathUtils.lerp(camera.position.y,targetPoint.y,.045);camera.position.z=THREE.MathUtils.lerp(camera.position.z,active==='galaxy'?7.4+mouse.zoom:target?4.25+mouse.zoom:11,.045);camera.lookAt(camera.position.x,camera.position.y,0)
      Object.entries(localGroups).forEach(([id,g])=>{const shown=id===active,targetScale=shown?(id==='solar'?1.08:1.22):.001;const s=THREE.MathUtils.lerp(g.scale.x,targetScale,.065);g.scale.setScalar(s);g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,shown?mouse.dragY:0,.06);g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,shown?mouse.dragX:0,.06);if(shown&&id!=='solar')g.rotation.z+=.0008})
      const solar=localGroups.solar;solar.userData.sun.rotation.y+=.006;solar.userData.planets.forEach(p=>{const a=p.userData.phase+t*p.userData.speed;p.position.set(Math.cos(a)*p.userData.radius,Math.sin(a)*p.userData.radius,0);p.rotation.y+=p.userData.spin})
      Object.entries(markerMeshes).forEach(([id,m])=>{m.visible=!active;m.rotation.z=t*(id==='solar'?.5:.22);const pulse=1+Math.sin(t*2+OBJECTS[id].index)*.13;m.scale.setScalar(pulse)})
      // 用同一个 Three.js 相机投影真实锚点；旋转银河盘时，锚点与银河坐标系保持锁定。
      Object.entries(OBJECTS).forEach(([id,o])=>{const element=anchorRefs.current[id];if(!element)return;const point=new THREE.Vector3(o.x,o.y,o.z||0).applyMatrix4(galacticFrame.matrixWorld);point.project(camera);element.style.left=`${(point.x*.5+.5)*100}%`;element.style.top=`${(-point.y*.5+.5)*100}%`;element.style.opacity=point.z>-1&&point.z<1?'1':'0'})
      const ruler=rulerRef.current;if(ruler){const center=new THREE.Vector3().applyMatrix4(galacticFrame.matrixWorld),sun=new THREE.Vector3(OBJECTS.solar.x,OBJECTS.solar.y,OBJECTS.solar.z).applyMatrix4(galacticFrame.matrixWorld);center.project(camera);sun.project(camera);const rect=host.getBoundingClientRect();const startX=(center.x*.5+.5)*rect.width,startY=(-center.y*.5+.5)*rect.height,endX=(sun.x*.5+.5)*rect.width,endY=(-sun.y*.5+.5)*rect.height;ruler.style.left=`${startX}px`;ruler.style.top=`${startY}px`;ruler.style.width=`${Math.hypot(endX-startX,endY-startY)}px`;ruler.style.transform=`rotate(${Math.atan2(endY-startY,endX-startX)*180/Math.PI}deg)`}
      renderer.render(scene,camera)};animate()
    return()=>{cancelAnimationFrame(frame);observer.disconnect();renderer.domElement.removeEventListener('pointerdown',onDown);renderer.domElement.removeEventListener('pointermove',onMove);renderer.domElement.removeEventListener('pointerup',onUp);renderer.domElement.removeEventListener('pointercancel',onUp);renderer.domElement.removeEventListener('wheel',onWheel);scene.traverse(o=>{o.geometry?.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material?.dispose()});renderer.dispose();renderer.domElement.remove()}
  },[])
  const current=selected?(selected==='galaxy'?GALAXY_INFO:OBJECTS[selected]):null
  const openObject=id=>setSelected(id)
  const closeSelection=()=>setSelected(selected==='galaxy'?null:'galaxy')
  return <div className={selected?'cosmic-explorer selected':'cosmic-explorer'}>
    <div className="cosmic-canvas" ref={hostRef}/>{!ready&&<div className="cosmic-loader"><i/><span>生成银河系旋臂…</span></div>}<div className="cosmic-grid"/>
    <div className="cosmic-status"><span/><b>MILKY WAY / FACE-ON</b><em>RIGID SPIRAL FRAME · INTERACTIVE MAP</em></div>
    {!selected&&<><div className="cosmic-copy"><span>PHYTWIN / COMPUTABLE UNIVERSE</span><h1>PhyTwin<br/>让宇宙成为可计算的孪生。</h1><p>给我们足够的算力，我们能模拟一颗行星、一座星系，乃至整个宇宙。也许真实世界本身，就运行在某个更高维度的数字孪生里。</p><div><button onClick={()=>setSelected('galaxy')}>放大银河系<Maximize2 size={15}/></button><Link to="/lab">进入实时实验室<ArrowRight size={15}/></Link></div></div>
      <GalaxyAnchorLayer onSelect={openObject} anchorRefs={anchorRefs} rulerRef={rulerRef}/></>}
    {selected&&current&&<><button className="cosmic-close" onClick={closeSelection}><X size={17}/>{selected==='galaxy'?'返回首页':'返回放大后的银河系'}</button>{selected==='galaxy'&&<GalaxyAnchorLayer expanded onSelect={openObject} anchorRefs={anchorRefs} rulerRef={rulerRef}/>}<div className="cosmic-detail"><span>{current.kind} / {current.index}</span><h2>{current.name}<small>{current.latin}</small></h2><p>{current.description}</p><div className="cosmic-detail-metric"><span>{current.metric}</span><b>{current.value}</b></div><div className="cosmic-controls-hint"><Rotate3D size={15}/><span>{selected==='galaxy'?'拖动倾斜银河盘':'拖动旋转局部结构'}</span><MousePointer2 size={14}/><span>滚轮缩放</span></div></div><div className="cosmic-model-note"><b>{selected==='galaxy'?'RIGID SPIRAL FRAME':selected==='solar'?'ORBITAL MOTION':'YH.PNG REFERENCE POSITION'}</b><span>{selected==='galaxy'?'旋臂、恒星纹理和全部位置锚点绑定在同一银河坐标框架中，以极慢速度整体旋转；引线仅用于分开重叠标签。':selected==='solar'?'行星具有独立自转与公转动画；为保证可读性，尺寸、距离与周期均采用视觉压缩。':'目标位置、方位与银心距离按照 yh.png 的俯视参考布局设置，不显示角度，并随银河坐标框架整体旋转。'}</span></div></>}
    <div className="cosmic-data-note">MILKY WAY · FIXED FOUR-ARM REFERENCE MODEL<br/>MARKERS · YH.PNG FACE-ON REFERENCE LAYOUT</div>
  </div>
}
