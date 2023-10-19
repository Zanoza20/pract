document.addEventListener('DOMContentLoaded', function() {
  const addProductForm = document.getElementById('addProductForm');
  const column1 = document.getElementById('column1');
  const column2 = document.getElementById('column2');
  const column3 = document.getElementById('column3');
  const searchInput = document.getElementById('пошук');
  const sortSelect = document.getElementById('сортування');
  const modeSelect = document.getElementById('modeSelect');
  const adminPasswordInput = document.getElementById('adminPassword');
  const loginButton = document.getElementById('loginButton');
  const imageInput = document.getElementById('зображення');
  const imagePreview = document.getElementById('зображення_прев\'ю');

  let products = JSON.parse(localStorage.getItem('products')) || [];
  let isAdmin = false;

  function updateProductList() {
    column1.innerHTML = '';
    column2.innerHTML = '';
    column3.innerHTML = '';

    products.forEach(function(product, index) {
      const div = document.createElement('div');
      div.classList.add('product');

      // Додавання інформації про товар
      div.innerHTML = `
        <p>Виробник: ${product.виробник}</p>
        <p>Модель: ${product.модель}</p>
        <p>Тип: ${product.тип}</p>
        <p>Об'єм пам'яті: ${product.обсяг} ГБ</p>
        <p>Speed Class: ${product.speedClass}</p>
        <p>Максимальна швидкість читання: ${product.швидкістьЧитання} МБ/с</p>
        <p>Максимальна швидкість запису: ${product.швидкістьЗапису} МБ/с</p>
        <p>Ціна: ${product.ціна} USD</p>
        <p>Наявність: ${product.наявність === 'в_наявності' ? 'В наявності' : 'Немає на складі'}</p>
      `;

      const img = document.createElement('img');
      img.src = product.зображення;
      img.alt = 'Зображення товару';
      div.appendChild(img);

      const buyButton = document.createElement('button');
      buyButton.textContent = 'Купити';
      buyButton.style.backgroundColor = 'purple';
      div.appendChild(buyButton);

      if (isAdmin) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Редагувати';
        editButton.addEventListener('click', function() {
          editProduct(index);
        });
        div.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.addEventListener('click', function() {
          deleteProduct(index);
        });
        div.appendChild(deleteButton);
      }

      if (index % 3 === 0) {
        column1.appendChild(div);
      } else if (index % 3 === 1) {
        column2.appendChild(div);
      } else {
        column3.appendChild(div);
      }
    });
  }

  function addProduct() {
    const manufacturer = document.getElementById('виробник').value;
    const model = document.getElementById('модель').value;
    const type = document.getElementById('тип').value;
    const storage = document.getElementById('обсяг').value;
    const speedClass = document.getElementById('speedClass').value;
    const readSpeed = document.getElementById('швидкістьЧитання').value;
    const writeSpeed = document.getElementById('швидкістьЗапису').value;
    const price = document.getElementById('ціна').value;
    const availability = document.getElementById('наявність').value;
    const image = imagePreview.src; // Отримуємо URL обраного зображення

    const product = {
      виробник: manufacturer,
      модель: model,
      тип: type,
      обсяг: storage,
      speedClass: speedClass,
      швидкістьЧитання: readSpeed,
      швидкістьЗапису: writeSpeed,
      ціна: price,
      наявність: availability,
      зображення: image
    };

    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));

    addProductForm.reset();
    updateProductList();
  }

  function editProduct(index) {
    const product = products[index];

    const newManufacturer = prompt('Введіть нового виробника:', product.виробник);
    const newModel = prompt('Введіть нову модель:', product.модель);
    const newType = prompt('Введіть новий тип:', product.тип);
    const newStorage = prompt('Введіть новий обсяг пам\'яті (ГБ):', product.обсяг);
    const newSpeedClass = prompt('Введіть новий Speed Class:', product.speedClass);
    const newReadSpeed = prompt('Введіть нову максимальну швидкість читання (МБ/с):', product.швидкістьЧитання);
    const newWriteSpeed = prompt('Введіть нову максимальну швидкість запису (МБ/с):', product.швидкістьЗапису);
    const newPrice = prompt('Введіть нову ціну:', product.ціна);
    const newAvailability = prompt('Введіть наявність (в_наявності або немає_на_складі):', product.наявність);
    const newImage = prompt('Введіть новий URL зображення:', product.зображення);

    product.виробник = newManufacturer;
    product.модель = newModel;
    product.тип = newType;
    product.обсяг = newStorage;
    product.speedClass = newSpeedClass;
    product.швидкістьЧитання = newReadSpeed;
    product.швидкістьЗапису = newWriteSpeed;
    product.ціна = newPrice;
    product.наявність = newAvailability;
    product.зображення = newImage;

    localStorage.setItem('products', JSON.stringify(products));
    updateProductList();
  }

  function deleteProduct(index) {
    if (confirm('Ви впевнені, що хочете видалити цей товар?')) {
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      updateProductList();
    }
  }

  function sortProducts() {
    const sortBy = sortSelect.value;

    products.sort(function(a, b) {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      } else if (a[sortBy] > b[sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });

    updateProductList();
  }

  function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {
      const manufacturer = product.виробник.toLowerCase();
      const model = product.модель.toLowerCase();

      return manufacturer.includes(searchTerm) || model.includes(searchTerm);
    });

    column1.innerHTML = '';
    column2.innerHTML = '';
    column3.innerHTML = '';

    filteredProducts.forEach(function(product, index) {
      const div = document.createElement('div');
      div.classList.add('product');

      div.innerHTML = `
        <p>Виробник: ${product.виробник}</p>
        <p>Модель: ${product.модель}</p>
        <p>Тип: ${product.тип}</p>
        <p>Об'єм пам'яті: ${product.обсяг} ГБ</p>
        <p>Speed Class: ${product.speedClass}</p>
        <p>Максимальна швидкість читання: ${product.швидкістьЧитання} МБ/с</p>
        <p>Максимальна швидкість запису: ${product.швидкістьЗапису} МБ/с</p>
        <p>Ціна: ${product.ціна} USD</p>
        <p>Наявність: ${product.наявність === 'в_наявності' ? 'В наявності' : 'Немає на складі'}</p>
      `;

      const img = document.createElement('img');
      img.src = product.зображення;
      img.alt = 'Зображення товару';
      div.appendChild(img);

      const buyButton = document.createElement('button');
      buyButton.textContent = 'Купити';
      buyButton.style.backgroundColor = 'purple';
      div.appendChild(buyButton);

      if (index % 3 === 0) {
        column1.appendChild(div);
      } else if (index % 3 === 1) {
        column2.appendChild(div);
      } else {
        column3.appendChild(div);
      }
    });
  }

  addProductForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addProduct();
  });

  sortSelect.addEventListener('change', sortProducts);
  searchInput.addEventListener('input', searchProducts);

  loginButton.addEventListener('click', function() {
    if (modeSelect.value === 'адміністратор' && adminPasswordInput.value === '1111') {
      isAdmin = true;
      adminPasswordInput.style.display = 'none';
      loginButton.style.display = 'none';
      addProductForm.style.display = 'block';
    } else if (modeSelect.value === 'користувач') {
      isAdmin = false;
      adminPasswordInput.style.display = 'none';
      loginButton.style.display = 'none';
    } else {
      alert('Невірний пароль для адміністратора.');
    }

    updateProductList();
  });

  updateProductList();
});
