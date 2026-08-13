import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Crosshair, Maximize2, MousePointer2, Rotate3D, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import brightStars from '../data/bright-stars-compact.json'

const OBJECTS = {
  milkyway: {
    index: '01', kind: 'GALAXY', name: '银河系', latin: 'Milky Way',
    summary: '棒旋星系 · 约 100,000 光年', metric: 'LOCAL STANDARD OF REST', value: '≈ 220 km/s',
    description: '以差分旋转粒子场展示银盘、核球与旋臂的速度梯度。太阳位于猎户臂附近，距银心约 26,000 光年。',
  },
  andromeda: {
    index: '02', kind: 'GALAXY / M31', name: '仙女座星系', latin: 'Andromeda Galaxy',
    summary: '螺旋星系 · 距离约 250 万光年', metric: 'RADIAL APPROACH', value: '≈ −110 km/s',
    description: 'M31 是距离银河系最近的大型星系。这里用倾斜盘面与差分角速度显示其旋转流场和恒星密度结构。',
  },
  lyra: {
    index: '03', kind: 'CONSTELLATION', name: '天琴座', latin: 'Lyra',
    summary: 'J2000 天球坐标 · 织女星主导', metric: 'VEGA DISTANCE', value: '≈ 25 ly',
    description: '按主要恒星的 J2000 赤经、赤纬构建星座拓扑；切换到三维后，深度表示恒星距离，不再是平面星图。',
  },
  draco: {
    index: '04', kind: 'CONSTELLATION', name: '天龙座', latin: 'Draco',
    summary: '北天拱极星座 · J2000 拓扑', metric: 'BRIGHTEST STAR', value: 'Eltanin · 2.24 mag',
    description: '以天棓四、天棓三、右枢等亮星构成蜿蜒的北天轮廓，并用近似视差深度展示真实恒星并不共面的结构。',
  },
}

const CONSTELLATIONS = {
  lyra: {
    stars: [
      ['Vega', 279.2347, 38.7837, 25, .03], ['ζ Lyr', 281.1930, 37.6051, 154, 4.34],
      ['Sheliak', 282.5199, 33.3627, 960, 3.52], ['Sulafat', 284.7359, 32.6896, 620, 3.25],
      ['δ² Lyr', 283.6258, 36.8986, 740, 4.30],
    ],
    links: [[0,1],[1,2],[2,3],[3,4],[4,1]], color: 0x9ecbff,
  },
  draco: {
    stars: [
      ['Thuban', 211.0973, 64.3758, 303, 3.67], ['Edasich', 231.2325, 58.9661, 102, 3.29],
      ['Grumium', 256.0589, 56.8726, 112, 3.75], ['Rastaban', 262.6082, 52.3014, 380, 2.79],
      ['Eltanin', 269.1515, 51.4889, 154, 2.24], ['Aldhibah', 265.4848, 72.1488, 330, 3.17],
      ['Kuma', 288.1381, 67.6615, 99, 4.51], ['Giausar', 172.8509, 69.3311, 334, 4.89],
    ],
    links: [[7,0],[0,1],[1,2],[2,3],[3,4],[4,2],[1,5],[5,6]], color: 0xb7a8ff,
  },
}

function parseColor(hex, target, index) {
  const color = new THREE.Color(hex)
  target[index * 3] = color.r; target[index * 3 + 1] = color.g; target[index * 3 + 2] = color.b
}

function makeStarField() {
  const count = brightStars.length
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  brightStars.forEach(([ra, dec, magnitude, color], index) => {
    const alpha = THREE.MathUtils.degToRad(ra)
    const delta = THREE.MathUtils.degToRad(dec)
    const radius = 34 + ((index * 13) % 19) * .08
    positions[index * 3] = radius * Math.cos(delta) * Math.cos(alpha)
    positions[index * 3 + 1] = radius * Math.sin(delta)
    positions[index * 3 + 2] = radius * Math.cos(delta) * Math.sin(alpha)
    parseColor(color, colors, index)
    sizes[index] = Math.max(.8, 5.7 - magnitude) * 1.55
  })
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { pixelRatio: { value: Math.min(devicePixelRatio || 1, 2) }, opacity: { value: .86 } },
    vertexShader: `
      attribute float aSize; varying vec3 vColor;
      uniform float pixelRatio;
      void main(){ vColor=color; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=clamp(aSize*pixelRatio*(34.0/-mv.z),1.1,8.0); gl_Position=projectionMatrix*mv; }
    `,
    fragmentShader: `
      varying vec3 vColor; uniform float opacity;
      void main(){ float d=length(gl_PointCoord-vec2(.5)); if(d>.5) discard; float a=smoothstep(.5,.03,d); gl_FragColor=vec4(vColor,a*opacity); }
    `,
    vertexColors: true,
  })
  return new THREE.Points(geometry, material)
}

function makeGalaxy(type) {
  const group = new THREE.Group()
  const count = type === 'milkyway' ? 7200 : 6200
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const radius = new Float32Array(count)
  const angle = new Float32Array(count)
  const speed = new Float32Array(count)
  const arms = type === 'milkyway' ? 4 : 2
  const baseColor = type === 'milkyway' ? new THREE.Color('#b9d7ff') : new THREE.Color('#b8a4ff')
  const warmColor = new THREE.Color('#ffd0a1')
  for (let i = 0; i < count; i += 1) {
    const bulge = Math.random() < .19
    const r = bulge ? Math.pow(Math.random(), 2.1) * 1.5 : Math.pow(Math.random(), .72) * 4.2
    const arm = i % arms
    const theta = bulge ? Math.random() * Math.PI * 2 : arm / arms * Math.PI * 2 + r * 1.48 + (Math.random() - .5) * (.24 + r * .055)
    positions[i * 3 + 1] = (Math.random() - .5) * (bulge ? .65 : .11 * (4.6 - r))
    radius[i] = r; angle[i] = theta; speed[i] = .75 + Math.random() * .5
    const color = bulge ? warmColor.clone().lerp(baseColor, .26) : baseColor.clone().offsetHSL((Math.random() - .5) * .035, 0, (Math.random() - .5) * .15)
    colors[i * 3] = color.r; colors[i * 3 + 1] = color.g; colors[i * 3 + 2] = color.b
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aRadius', new THREE.BufferAttribute(radius, 1))
  geometry.setAttribute('aAngle', new THREE.BufferAttribute(angle, 1))
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1))
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
    uniforms: { time: { value: 0 }, opacity: { value: 1 }, pointScale: { value: 44 * Math.min(devicePixelRatio || 1, 2) } },
    vertexShader: `
      attribute float aRadius; attribute float aAngle; attribute float aSpeed;
      varying vec3 vColor; uniform float time; uniform float pointScale;
      void main(){
        float omega=(.16/(.48+aRadius))*aSpeed; float theta=aAngle+time*omega;
        vec3 p=position; p.x=cos(theta)*aRadius; p.z=sin(theta)*aRadius;
        vColor=color; vec4 mv=modelViewMatrix*vec4(p,1.0); gl_PointSize=clamp(pointScale/max(1.0,-mv.z),1.0,6.0); gl_Position=projectionMatrix*mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor; uniform float opacity;
      void main(){ float d=length(gl_PointCoord-vec2(.5)); if(d>.5)discard; gl_FragColor=vec4(vColor,smoothstep(.5,.05,d)*opacity); }
    `,
  })
  const points = new THREE.Points(geometry, material)
  if (type === 'andromeda') { points.scale.set(1.12,.78,1); group.rotation.z = -.28; group.rotation.x = .38 }
  group.add(points)
  const core = new THREE.Mesh(new THREE.SphereGeometry(.34, 24, 16), new THREE.MeshBasicMaterial({ color: type === 'milkyway' ? 0xffe0b5 : 0xe1c6ff, transparent: true, opacity: .58, blending: THREE.AdditiveBlending }))
  core.scale.y = .45; group.add(core)
  group.userData.flowMaterial = material
  return group
}

function makeConstellation(id) {
  const data = CONSTELLATIONS[id]
  const group = new THREE.Group()
  const centerRa = data.stars.reduce((sum, star) => sum + star[1], 0) / data.stars.length
  const centerDec = data.stars.reduce((sum, star) => sum + star[2], 0) / data.stars.length
  const projected = data.stars.map(([,ra,dec,distance,magnitude]) => new THREE.Vector3(
    (ra - centerRa) * Math.cos(THREE.MathUtils.degToRad(centerDec)) * .11,
    (dec - centerDec) * .11,
    Math.log(distance / 120) * .8,
  ))
  data.links.forEach(([a,b]) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([projected[a], projected[b]])
    group.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: data.color, transparent: true, opacity: .48, blending: THREE.AdditiveBlending })))
  })
  projected.forEach((position, index) => {
    const magnitude = data.stars[index][4]
    const star = new THREE.Mesh(new THREE.SphereGeometry(Math.max(.035,.105-magnitude*.012), 16, 12), new THREE.MeshBasicMaterial({ color: index === 0 ? 0xeaf6ff : data.color, transparent: true, opacity: .98 }))
    star.position.copy(position); group.add(star)
    const halo = new THREE.Mesh(new THREE.SphereGeometry(Math.max(.09,.19-magnitude*.014), 12, 8), new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: .10, blending: THREE.AdditiveBlending }))
    halo.position.copy(position); group.add(halo)
  })
  // 环绕亮星的示踪粒子用于表现局部天体动力学，而非真实流体介质。
  const traceCount = 520
  const tracePositions = new Float32Array(traceCount * 3)
  const centers = new Float32Array(traceCount * 3)
  const phases = new Float32Array(traceCount)
  const orbitRadius = new Float32Array(traceCount)
  for (let i = 0; i < traceCount; i += 1) {
    const center = projected[i % projected.length]
    centers.set([center.x,center.y,center.z],i*3)
    phases[i]=Math.random()*Math.PI*2; orbitRadius[i]=.12+Math.random()*.34
  }
  const traceGeometry = new THREE.BufferGeometry()
  traceGeometry.setAttribute('position',new THREE.BufferAttribute(tracePositions,3))
  traceGeometry.setAttribute('aCenter',new THREE.BufferAttribute(centers,3))
  traceGeometry.setAttribute('aPhase',new THREE.BufferAttribute(phases,1))
  traceGeometry.setAttribute('aOrbit',new THREE.BufferAttribute(orbitRadius,1))
  const traceMaterial = new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{time:{value:0},opacity:{value:.55}},vertexShader:`
    attribute vec3 aCenter; attribute float aPhase; attribute float aOrbit; uniform float time;
    void main(){float a=aPhase+time*(.18+.25/aOrbit);vec3 p=aCenter+vec3(cos(a)*aOrbit,sin(a*1.3)*aOrbit*.22,sin(a)*aOrbit);vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=2.2;gl_Position=projectionMatrix*mv;}
  `,fragmentShader:`uniform float opacity;void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;gl_FragColor=vec4(.63,.83,1.,opacity*(1.-d*2.));}`})
  group.add(new THREE.Points(traceGeometry,traceMaterial))
  group.userData.flowMaterial = traceMaterial
  group.userData.projected = projected
  return group
}

export default function CosmicExplorer() {
  const hostRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const selectedRef = useRef(selected)
  const hoveredRef = useRef(hovered)
  const [ready, setReady] = useState(false)
  useEffect(() => { selectedRef.current = selected }, [selected])
  useEffect(() => { hoveredRef.current = hovered }, [hovered])

  useEffect(() => {
    const host = hostRef.current
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    renderer.setClearColor(0x010207, 1); renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); host.appendChild(renderer.domElement)
    const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x010207, .018)
    const camera = new THREE.PerspectiveCamera(44, 1, .1, 100)
    camera.position.set(0,0,11)
    const sky = makeStarField(); scene.add(sky)
    const universe = new THREE.Group(); scene.add(universe)
    const positions = { milkyway: new THREE.Vector3(-3.7,1.25,0), andromeda:new THREE.Vector3(3.8,1.1,-.4), lyra:new THREE.Vector3(-3.3,-2.25,.4), draco:new THREE.Vector3(3.5,-2.15,.1) }
    const objectGroups = {
      milkyway:makeGalaxy('milkyway'), andromeda:makeGalaxy('andromeda'),
      lyra:makeConstellation('lyra'), draco:makeConstellation('draco'),
    }
    Object.entries(objectGroups).forEach(([id,group])=>{
      group.position.copy(positions[id]); group.scale.setScalar(id === 'milkyway' || id === 'andromeda' ? .48 : .72)
      universe.add(group)
    })

    const resize = () => { const rect=host.getBoundingClientRect(); renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false); camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix() }
    const observer = new ResizeObserver(resize);observer.observe(host);resize()
    const mouse={x:0,y:0,down:false,lastX:0,lastY:0,dragX:0,dragY:0,zoom:0}
    const onMove=(event)=>{
      const rect=renderer.domElement.getBoundingClientRect();mouse.x=(event.clientX-rect.left)/rect.width*2-1;mouse.y=(event.clientY-rect.top)/rect.height*2-1
      if(mouse.down&&selectedRef.current){mouse.dragX+=(event.clientX-mouse.lastX)*.006;mouse.dragY+=(event.clientY-mouse.lastY)*.004;mouse.lastX=event.clientX;mouse.lastY=event.clientY}
    }
    const onDown=(event)=>{mouse.down=true;mouse.lastX=event.clientX;mouse.lastY=event.clientY;renderer.domElement.setPointerCapture(event.pointerId)}
    const onUp=()=>{mouse.down=false}
    const onWheel=(event)=>{if(selectedRef.current){event.preventDefault();mouse.zoom=Math.max(-2,Math.min(2,mouse.zoom+event.deltaY*.003))}}
    renderer.domElement.addEventListener('pointermove',onMove);renderer.domElement.addEventListener('pointerdown',onDown);renderer.domElement.addEventListener('pointerup',onUp);renderer.domElement.addEventListener('pointercancel',onUp);renderer.domElement.addEventListener('wheel',onWheel,{passive:false})
    let frame=0;let startedAt=performance.now();setReady(true)
    const animate=()=>{
      frame=requestAnimationFrame(animate);const time=(performance.now()-startedAt)/1000;const active=selectedRef.current;const hover=hoveredRef.current
      sky.rotation.y=time*.003 + mouse.x*.025;sky.rotation.x=mouse.y*.018
      const targetPosition=active?positions[active].clone().multiplyScalar(-1):new THREE.Vector3()
      universe.position.lerp(targetPosition,.055)
      universe.rotation.y=THREE.MathUtils.lerp(universe.rotation.y,active?mouse.dragX:mouse.x*.045,.05)
      universe.rotation.x=THREE.MathUtils.lerp(universe.rotation.x,active?mouse.dragY:-mouse.y*.025,.05)
      camera.position.z=THREE.MathUtils.lerp(camera.position.z,active?7.2+mouse.zoom:11,.045)
      Object.entries(objectGroups).forEach(([id,group])=>{
        const isGalaxy = id === 'milkyway' || id === 'andromeda'; const base = isGalaxy ? .48 : .72
        const targetScale=active?(id===active?(isGalaxy?1.32:1.65):.25):(id===hover?base*1.18:base)
        group.scale.lerp(new THREE.Vector3(targetScale,targetScale,targetScale),.065)
        if(!active||id===active){group.rotation.y += isGalaxy ? .0017 : .00055}
        if(active===id){group.rotation.y+=.0015}
        if(group.userData.flowMaterial){group.userData.flowMaterial.uniforms.time.value=time;group.userData.flowMaterial.uniforms.opacity.value=active&&id!==active ? .06 : (id===hover ? 1 : .82)}
        group.children.forEach((child)=>{if(child.material?.opacity!==undefined&&!child.material.uniforms){child.material.opacity=THREE.MathUtils.lerp(child.material.opacity,active&&id!==active ? .035 : child.type==='Line' ? .5 : .9,.06)}})
      })
      renderer.render(scene,camera)
    }
    animate()
    return()=>{cancelAnimationFrame(frame);observer.disconnect();renderer.domElement.removeEventListener('pointermove',onMove);renderer.domElement.removeEventListener('pointerdown',onDown);renderer.domElement.removeEventListener('pointerup',onUp);renderer.domElement.removeEventListener('pointercancel',onUp);renderer.domElement.removeEventListener('wheel',onWheel);scene.traverse((object)=>{object.geometry?.dispose();if(Array.isArray(object.material))object.material.forEach(m=>m.dispose());else object.material?.dispose()});renderer.dispose();renderer.domElement.remove()}
  },[])

  const current = selected ? OBJECTS[selected] : null
  return <div className={selected ? 'cosmic-explorer selected' : 'cosmic-explorer'}>
    <div className="cosmic-canvas" ref={hostRef}/>
    {!ready && <div className="cosmic-loader"><i/><span>装载 J2000 星表…</span></div>}
    <div className="cosmic-grid"/>
    <div className="cosmic-status"><span/><b>CELESTIAL FIELD ONLINE</b><em>3,249 VISIBLE STARS · J2000</em></div>

    {!selected && <>
      <div className="cosmic-copy">
        <span>PHYTWIN / CELESTIAL COMPUTE 01</span>
        <h1>从星系尺度，<br/>看见计算的流动。</h1>
        <p>把复杂物理转化为可交互、可验证、可决策的计算结果。掠过目标查看响应，点击进入三维场结构。</p>
        <div><button onClick={()=>setSelected('milkyway')}>探索宇宙场<Maximize2 size={15}/></button><Link to="/lab">进入 CAE 实验室<ArrowRight size={15}/></Link></div>
      </div>
      <div className="cosmic-object-list">{Object.entries(OBJECTS).map(([id,item])=><button key={id} className={hovered===id?'active':''} onMouseEnter={()=>setHovered(id)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(id)} onBlur={()=>setHovered(null)} onClick={()=>setSelected(id)}>
        <span>{item.index}</span><div><small>{item.kind}</small><b>{item.name}</b><em>{item.latin}</em></div><Crosshair size={15}/>
      </button>)}</div>
      <a className="cosmic-scroll" href="#capability-map"><ArrowDown size={14}/><span>SCROLL TO ENGINEERING SCALE</span></a>
    </>}

    {selected && current && <>
      <button className="cosmic-close" onClick={()=>{setSelected(null);setHovered(null)}}><X size={17}/>返回全天视图</button>
      <div className="cosmic-detail">
        <span>{current.kind} / {current.index}</span><h2>{current.name}<small>{current.latin}</small></h2><p>{current.description}</p>
        <div className="cosmic-detail-metric"><span>{current.metric}</span><b>{current.value}</b></div>
        <div className="cosmic-controls-hint"><Rotate3D size={15}/><span>拖动旋转空间结构</span><MousePointer2 size={14}/><span>滚轮缩放</span></div>
      </div>
      <div className="cosmic-model-note"><b>{selected==='milkyway'||selected==='andromeda'?'DIFFERENTIAL ROTATION FIELD':'J2000 CELESTIAL TOPOLOGY'}</b><span>{selected==='milkyway'||selected==='andromeda'?'恒星粒子随半径采用不同角速度；用于动力学可视化，不是 N-body 高保真求解。':'赤经/赤纬用于方向，公开距离数据映射为空间深度；星座连线是观测文化图式。'}</span></div>
    </>}
    <div className="cosmic-data-note">STAR POSITIONS · YALE BRIGHT STAR CATALOG / J2000<br/>GALAXY FLOW · PROCEDURAL DYNAMICS MODEL</div>
  </div>
}
