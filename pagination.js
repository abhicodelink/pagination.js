function getPageList(totalPages, page, maxLength) {
          function range(start, end) {
                    return Array.from(Array(end - start + 1), (_, i) => i + start);
          };

          var sideWidth = maxLength < 9 ? 1 : 2;
          var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
          var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

          if (totalPages <= maxLength) {
                    return range(1, totalPages);
          }

          if (page <= maxLength - sideWidth - 1 - rightWidth) {
                    return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
          }
          if (page >= totalPages - sideWidth - 1 - rightWidth) {
                    return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
          }
          return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
};

$(function () {
          var numberOfItems = $(".products").length;
          var limitPerPage = 1;
          var totalPages = Math.ceil(numberOfItems / limitPerPage);
          var paginationSize = 5;
          var currentPage;

          function showPage(whichPage) {
                    if (whichPage < 1 || whichPage > totalPages) return false;
                    currentPage = whichPage;
                    $(".products").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
                 

                    getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                              $(".current-page").addClass("pagi-list").addClass(item ? "current-page" : "").toggleClass("pagi-ac", item === currentPage)

                    });
                    $(".prev-b").toggleClass("disable-pagi", currentPage === 1);
                    $(".next-b").toggleClass("disable-pagi", currentPage === totalPages);
                    return true;

          };

          $(".products").show();
          showPage(1);

          $(document).on("click", ".pagination li.current-page:not(.active)", function () {
                    return showPage(+$(this).text()), change(currentPage);

                  
          });
          
          $(".next-b").on("click", function()
          {
                    return showPage(currentPage + 1), change(currentPage);
          });
          
          $(".prev-b").on("click", function () {
                    return showPage(currentPage - 1), change(currentPage);
          })
        
});

function change(page) {
          
          if (page == 1) {
                    document.querySelector(".pagi-re").innerHTML = "1-12";
                    $(".pagination").removeClass("top");
          }
          if (page == 2) {
                    document.querySelector(".pagi-re").innerHTML = "13-24";
                    $(".pagination").removeClass("top");
          }
          if (page == 3) {
                    document.querySelector(".pagi-re").innerHTML = "25-30";
                    $(".pagination").addClass("top");
          }

}