var productPrice = #{product.price};

var quanity = document.getElementById('select-quanity');
quanity.addEventListener('change', onAgeFilterChange);

function onAgeFilterChange() {
    // get current value of the select
    var selectedQuanity = parseInt(quanity.value);

    var total = productPrice * selectedQuanity;
    // render
    render(total);
  }

function render(total) {
  var totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = '$' + total;
}    
