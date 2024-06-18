async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("ERROR:", error);
    return [];
  }
}

async function getProjects() {
  return await fetchData("http://localhost:5678/api/works");
}

async function getCategories() {
  return await fetchData("http://localhost:5678/api/categories");
}

function addCategories(categories) {
  const allCategories = { id: "all", name: "Tous" };
  categories.unshift(allCategories);
  const menu = document.querySelector(".filter"); 
  menu.innerHTML = "";

  categories.forEach((category) => {
    const categoryOption = document.createElement("li");
    categoryOption.className = "category";
    categoryOption.textContent = category.name;
    categoryOption.dataset.categoryId = category.id;
    menu.appendChild(categoryOption);
  });
}

function addProjects(projects) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  projects.forEach((project) => {
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

function addCategoryEventListeners(projects) {
  const categoryElements = document.querySelectorAll(".filter .category");

  categoryElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      const categoryId = event.target.dataset.categoryId;
      let filteredProjects = categoryId === "all"
        ? projects
        : projects.filter((project) => project.categoryId == categoryId);

      addProjects(filteredProjects);

      categoryElements.forEach((el) => el.classList.remove("selected"));
      event.target.classList.add("selected");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const projects = await getProjects();
  addProjects(projects);

  const categories = await getCategories();
  addCategories(categories);

  addCategoryEventListeners(projects);
});
