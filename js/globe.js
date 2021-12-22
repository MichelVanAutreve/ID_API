//const hData = [];
const api = "https://api.spacexdata.com/v4/starlink";

const getData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const convertData = async () => {
  const satellites = [];
  const data = await getData(api);
  data.forEach((element) => {
    if (
      element.latitude != null &&
      element.longitude != null &&
      element.height_km != null &&
      element.velocity_kms != null
    ) {
      const satellite = {
        lat: element.latitude,
        lng: element.longitude,
        alt: element.height_km / 5000,
        radius: 0.5,
        color: "crimson",
        spd: element.velocity_kms / 1000,
      };
      satellites.push(satellite);
    }
  });

  const zoom = (e) => {
    console.log(e);
    e.toGeoCoords({ lat: 2, lng: 4, altitude: 1 });
  };

  const world = Globe()(document.querySelector(".globe"))
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
    .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
    .pointOfView({ altitude: 1.5 })
    .customLayerData(satellites)
    .onCustomLayerClick(zoom)
    .customThreeObject(
      (d) =>
        new THREE.Mesh(
          new THREE.SphereBufferGeometry(d.radius),
          new THREE.MeshLambertMaterial({ color: d.color })
        )
    )
    .customThreeObjectUpdate((obj, d) => {
      Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
    });

  //world.controls().autoRotate = true;
  //world.controls().autoRotateSpeed = -1;

  (function moveSpheres() {
    satellites.forEach((d) => (d.lng += d.spd));
    world.customLayerData(world.customLayerData());
    requestAnimationFrame(moveSpheres);
  })();
};

document.addEventListener(`DOMContentLoaded`, () => {
  convertData();
});

const N = 300;
const gData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  alt: Math.random() * 0.8 + 0.1,
  radius: Math.random() * 5,
  color: ["#586BDB", "#8C51E8", "#F2441D", "#262626"][
    Math.round(Math.random() * 3)
  ],
}));
//console.log(hData);
