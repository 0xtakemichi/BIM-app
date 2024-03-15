import { IProject, ProjectStatus, UserRole } from "./class/Project"
import { ProjectsManager } from "./class/ProjectsManager"
//
function showModal(id: string){
    const modal = document.getElementById(id)
    if(modal && modal instanceof HTMLDialogElement){
        modal.showModal()
    }else{
        console.warn("The provided modal wasn't found. ID: ", id)
    }
}
function closeModal(id: string){
    const modal = document.getElementById(id)
    if(modal && modal instanceof HTMLDialogElement){
        modal.close()
    }else{
        console.warn("The provided modal wasn't found. ID: ", id)
    }
}

// list and projectsManager
const projectListUI = document.getElementById("projects-list") as HTMLElement
const projectsManager = new ProjectsManager(projectListUI)

//Btn form click
const newProjectBtn = document.getElementById("new-project-btn")
if(newProjectBtn){
    newProjectBtn.addEventListener("click", () => {showModal("new-project-modal")})
}else{
    console.warn("New projects button was not found")
}
// Form
const projectForm = document.getElementById("new-project-form")
if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(projectForm)
        const projectData: IProject = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            status: formData.get("status") as ProjectStatus,
            userRole: formData.get("userRole") as UserRole,
            finishDate: new Date(formData.get("finishDate") as string)
        }
        try {
            const project = projectsManager.newProject(projectData)
            projectForm.reset()
            closeModal("new-project-modal")
            
        } catch (err) {
            alert(err)
        }
    })
}else{
    console.warn("The project form was not found. Check the ID!")
}