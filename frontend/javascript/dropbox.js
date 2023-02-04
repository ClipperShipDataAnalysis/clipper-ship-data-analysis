let dropZone = document.getElementById("drop-zone");
let fileInput = document.getElementById("file-input");
let errorMessage = document.getElementById("error-message");
let fileList = document.getElementById("file-list");
  
  dropZone.addEventListener("dragover", (e) => {
	e.preventDefault();
	dropZone.classList.add("drag-over");
  });
  
  dropZone.addEventListener("dragleave", (e) => {
	e.preventDefault();
	dropZone.classList.remove("drag-over");
  });
  
  dropZone.addEventListener("drop", (e) => {
	e.preventDefault();
	dropZone.classList.remove("drag-over");
	var files = e.dataTransfer.files;
	handleFiles(files);
  });
  
  fileInput.addEventListener("change", (e) => {
	var files = e.target.files;
	handleFiles(files);
  });
  
  function handleFiles(files) {
	console.log(files);
	 // Create a form data object
	 const formData = new FormData();
	 // Append all the selected files to the form data object

	 // Allowed file types, csv, xls, xlsx
	 const allowedTypes = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
	 // Loop through all the selected files
	 for (let i = 0; i < files.length; i++) {
	   // Check if the file type is in the allowedTypes array
	   if (allowedTypes.includes(files[i].type)) {
		 // If it is, append the file to the form data object
		 formData.append("files[]", files[i]);
		 // Update the file list
		 const fileItem = document.createElement("li");
		 fileItem.innerHTML = `${files[i].name} <button type="button" class="remove-button">Remove</button>`;
		 fileList.appendChild(fileItem);
		 // Add a click event listener to the remove button
		 fileItem.querySelector(".remove-button").addEventListener("click", e => {
		   // Remove the file from the form data object
		   formData.delete("files[]", files[i]);
		   // Remove the file item from the file list
		   fileList.removeChild(fileItem);
		 });
	   } else {
		 // If not, show an error message
		 console.error(`File type ${files[i].type} is not allowed.`);
		 errorMessage.innerHTML = `File type ${files[i].type} is not allowed. Please try uploading a CSV, XLS, or XLSX file.`;
	   }
	 }
	// Do something with the files here

  }
  
