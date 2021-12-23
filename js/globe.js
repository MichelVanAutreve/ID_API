const api = "https://api.spacexdata.com/v4/starlink";
let world;

const getData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const zoom = (e) => {
  console.log(e);
  world.pointOfView({ lat: e.lat, lng: e.lng, altitude: 0.5 }, 1000);
  world.controls().autoRotate = false;
  document.querySelector(`.nameInput`).textContent = e.name;
  document.querySelector(`.launchInput`).textContent = e.launch;
  document.querySelector(`.latInput`).textContent = e.lat;
  document.querySelector(`.longInput`).textContent = e.long;
  document.querySelector(`.altInput`).textContent = e.alt * 5000;
};

const createGlobe = async () => {
  const satellites = [];

  const data = await getData(api);

  data.forEach((element) => {
    if (
      element.latitude != null &&
      element.longitude != null &&
      element.height_km != null &&
      element.velocity_kms != null &&
      element.spaceTrack.OBJECT_NAME != null &&
      element.spaceTrack.LAUNCH_DATE != null
    ) {
      const satellite = {
        name: element.spaceTrack.OBJECT_NAME,
        lat: element.latitude,
        lng: element.longitude,
        alt: element.height_km,
        radius: 0.5,
        color: "crimson",
        spd: element.velocity_kms,
        launch: element.spaceTrack.LAUNCH_DATE,
      };
      satellites.push(satellite);
    }
  });

  world = Globe()(document.querySelector(".c-globe"))
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
    .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
    .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
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
      Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt / 5000));
    });

  world.controls().autoRotate = true;
  world.controls().autoRotateSpeed = 0.1;

  document.querySelector(`.rotationInput`).addEventListener("input", (e) => {
    world.controls().autoRotateSpeed = e.target.value;
    world.controls().autoRotate = true;
  });
};

document.addEventListener(`DOMContentLoaded`, () => {
  createGlobe();
});
