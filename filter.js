var my_filter = {};
var s_filter_val = {};
var filter_path = '';
var sort_value = $('.select__select').val();

$(document).on("click",".filter-btn",function() {
    var filter_path = window.location.pathname;
    var s_filter = "";
    var filter_count = 0;

    sort_value = $('.select__select').val();
    $('.filter-btn.is-active-filter').each(function (index) {
       

      my_filter[index] = $(this).find("input.filters__input").attr('name');
      s_filter_val[index] = $(this).find("input.filters__input").val();
      s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
      filter_count ++;
    });

    $('.price__input').each(function (index) {
      my_filter[index] = $(this).attr('name');
      s_filter_val[index] = $(this).val();
      s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
      filter_count ++;
    });




    if(sort_value != null){
        filter_path = filter_path + "?" + s_filter + "&sort_by=" + sort_value;
      }else{
    
        filter_path = filter_path + "?" + s_filter;
      }

      fetch(filter_path + "&section_id=main-collection-product-grid")
      .then((response) => response.text())
      .then((collectionData) => {
        var collection_html = $(collectionData);
        var collection_items = $(".collection-result", collection_html);
        $(".collection-result").replaceWith(collection_items);
      });


      console.log(filter_path);

});

$(document).on("mouseup",".price__input",function() {

  var filter_path = window.location.pathname;
  var s_filter = "";
  var filter_count = 0;

  sort_value = $('.select__select').val();

  $('.filter-btn.is-active-filter').each(function (index) {
      
    my_filter[index] = $(this).find("input.filters__input").attr('name');
    s_filter_val[index] = $(this).find("input.filters__input").val();
    s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
    filter_count ++;
  });


  $('.price__input').each(function (index) {
  my_filter[index] = $(this).attr('name');
  s_filter_val[index] = $(this).val();
  s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
  filter_count ++;
});

if(sort_value != null){
  filter_path = filter_path + "?" + s_filter + "&sort_by=" + sort_value;
}else{

  filter_path = filter_path + "?" + s_filter;
}


fetch(filter_path + "&section_id=main-collection-product-grid")
.then((response) => response.text())
.then((collectionData) => {
  var collection_html = $(collectionData);
  var total_count = 0;
  var collection_items = $(".show-products", collection_html);
  $(".show-products").replaceWith(collection_items);
  total_count = $(".show-products").find(".product-item").length;
  $('.product-count').text(total_count);
  
});

console.log(filter_path);

});

$(document).on("change",".select__select",function() {

    var filter_path = window.location.pathname;
    var s_filter = "";
    var filter_count = 0;

    sort_value = $('.select__select').val();
    $('.filter-btn.is-active-filter').each(function (index) {
  

      my_filter[index] = $(this).find("input.filters__input").attr('name');
      s_filter_val[index] = $(this).find("input.filters__input").val();
      s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
      filter_count ++;
    });


    $('.price__input').each(function (index) {
      my_filter[index] = $(this).attr('name');
      s_filter_val[index] = $(this).val();
      s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
      filter_count ++;
    });


  
  if(sort_value != null){
    filter_path = filter_path + "?" + s_filter + "&sort_by=" + sort_value;
  }else{

    filter_path = filter_path + "?" + s_filter;
  }

  
  fetch(filter_path + "&section_id=main-collection-product-grid")
  .then((response) => response.text())
  .then((collectionData) => {
    var collection_html = $(collectionData);
    var collection_items = $(".show-products", collection_html);
    $(".show-products").replaceWith(collection_items);
  });

  console.log(filter_path);

});

$('.filter-reset_text').click(function(){
  var filter_path = window.location.pathname;

  fetch(filter_path + "?section_id=main-collection-product-grid")
      .then((response) => response.text())
      .then((collectionData) => {
        var total_count = 0;
        var collection_html = $(collectionData);
        var collection_items = $(".show-products", collection_html);
        $(".show-products").replaceWith(collection_items);

        total_count = $(".show-products").find(".product-item").length;
        $('.product-count').text(total_count);

      });

  
      $('.filter-btn').removeClass('is-active-filter');
});


//range picker

const rangeInput = document.querySelectorAll(".range-input input"),

  range = document.querySelector(".slider .progress");
let priceGap = 1;



rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {

      rangeInput[0].value = minVal;
      rangeInput[1].value = maxVal;
      document.querySelector('.price-number-min').innerHTML = minVal;
      document.querySelector('.price-number-max').innerHTML = maxVal;

 
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});


