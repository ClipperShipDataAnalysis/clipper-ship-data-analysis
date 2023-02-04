

const input = document.querySelector('#fileInput');
    input.addEventListener('change', function() {
      console.log(input.files[0].name);
    });

const dropZone = document.querySelector('.drop-zone');
dropZone.addEventListener('dragover', function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.style.background = "#eee";
});

dropZone.addEventListener('dragleave', function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.style.background = "";
});

dropZone.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.style.background = "";

  const file = e.dataTransfer.files[0];
  console.log(file);
});
