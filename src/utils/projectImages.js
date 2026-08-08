// Loads every image inside src/assets/projects/ and exposes it by filename
// (without extension), so data files can reference "project-1" and this
// resolves to whatever project-1.jpg / project-1.png / project-1.webp you add.
//
// Drop your images in as:
//   src/assets/projects/project-1.jpg
//   src/assets/projects/project-2.jpg
//   src/assets/projects/project-3.jpg

const modules = import.meta.glob("../assets/projects/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
});

const projectImages = {};

for (const path in modules) {
  const fileName = path.split("/").pop();
  const key = fileName.substring(0, fileName.lastIndexOf("."));
  projectImages[key] = modules[path];
}

export default projectImages;
