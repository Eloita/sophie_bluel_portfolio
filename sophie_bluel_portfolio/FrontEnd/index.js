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
async function getCategories() {
	try {
	  const response = await fetch("http://localhost:5678/api/categories");
	  if (!response.ok) {
		throw new Error(`Erreur HTTP ! statut : ${response.status}`);
	  }
	  const categories = await response.json();
	  return categories;
	} catch (error) {
	  console.log("ERROR");
	  return [];
	}
  }
  function addCategories() {
    const categories = [
      { id: 'all', name: 'Tous' },
      { id: '1', name: 'Objets' },
      { id: '2', name: 'Appartements' },
      { id: '3', name: 'Hotels & restaurants' },
    ];
    const menu = document.querySelector('.filter');
    menu.innerHTML = ''; 
  
    categories.forEach(category => {
      const categoryOption = document.createElement('button');
      categoryOption.className = 'category';
      categoryOption.textContent = category.name;
      categoryOption.dataset.categoryId = category.id;
      menu.appendChild(categoryOption);
    });
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
function addCategoryEventListeners() {
    const categoryElements = document.querySelectorAll('.filter .category');
    categoryElements.forEach(element => {
      element.addEventListener('click', async (event) => {
        const categoryId = event.target.dataset.categoryId;
        let projects = await getProjects();
        if (categoryId !== 'all') {
          projects = projects.filter(project => project.categoryId == categoryId); // Assurez-vous que 'categoryId' est la bonne clé
        }
        addProjects(projects);
      });
    });
  }
document.addEventListener("DOMContentLoaded", async () => {
  const projects = await getProjects();
  addProjects(projects);
  const categories = await getCategories();
  addCategories(categories);
  addCategoryEventListeners();
});
