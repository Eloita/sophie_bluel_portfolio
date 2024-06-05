
//Projet à récupérer
async function getProjects() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const projects = await response.json();
    console.log(response);
    return projects;
  } catch (error) {
    console.log("ERROR");
  }
}

function addProjects(projects) {
  // Construction du html
  const gallery = document.querySelector(".gallery"); // div du selecteur "gallery"
  gallery.innerHTML = "";

  projects.forEach((project) => {
    console.log(project);
    const portfolioProject = document.createElement("figure");
    const imageProject = document.createElement("img");
    imageProject.src = project.imageUrl; 
    imageProject.alt = project.title; 
    const titleProject = document.createElement("figcaption");
    titleProject.textContent = project.title;

    portfolioProject.appendChild(imageProject);
    portfolioProject.appendChild(titleProject);
    gallery.appendChild(portfolioProject);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const projects = await getProjects();
  addProjects(projects);
});
