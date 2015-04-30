$(function () {

  var tags = window.tags;
  var tagContainer = $('.filter-tags table');

  var currentQuery = {
    tags: [],
    institutions: []
  };

  var filter = function(query){
    var filtered = $('.wrapper-info').filter(function(){
      var institutionMatch = false;
      var tagMatch = false;

      if (query.institutions.length > 0) {
        institutionMatch = $(this).find('.institution').filter(function(){
          var thisPlatform = $(this).text().replace(",", "").trim();
          var matchesQuery = query.institutions.indexOf(thisPlatform) !== -1;
          return matchesQuery
        }).size() === query.institutions.length;
      }
      else {
        institutionMatch = true;
      }

      if (query.tags.length > 0) {
        tagMatch = $(this).find('td.wrapper-tag').filter(function(){
          var thisValue = $(this).text().trim();
          return query.tags.indexOf(thisValue) !== -1;
        }).size() === query.tags.length;
      }
      else {
        tagMatch = true;
      }

      return institutionMatch && tagMatch;
    });

    // Show the wrappers and then immediately hide the ones that contain the filter tag
    $('.wrapper-info').show().not(filtered).hide();

    // Hide category labels if there are no results in them
    /*
    $(".category-info").show().each(function() {
      var $el = $(this);
      var $wrapperList = $el.next();
      if ($(".wrapper-info:visible", $wrapperList).size() === 0) {
        $el.hide();
      }
    });
    */

    $(".wrappers-column-1").removeClass("adjusted");
    $(".wrappers-column-0").show();
    $(".wrappers-list").each(function() {
      if ($(".wrappers-column-0 .wrapper-info:visible", this).size() === 0) {
        $(".wrappers-column-0", this).hide();
        $(".wrappers-column-1", this).addClass("adjusted");
      }
    });
  }


  var onFilterClick = function(queryArray) {
    return function(e) {
      var selected = $(this);
      var selectedText = selected.text();

      if(selected.hasClass('active')) {
        var index = queryArray.indexOf(selectedText);
        queryArray.splice(index, 1);
        selected.removeClass('active');
        filter(currentQuery);
      } else {
        // Set the active class on the selected
        queryArray.push(selectedText);
        selected.addClass('active');
        filter(currentQuery);
      }
    }
  };

  tagContainer.on('click', 'td', onFilterClick(currentQuery.tags));

  $(".filter-institutions table").on('click', 'td', onFilterClick(currentQuery.institutions));

  $(".wrapper-tags-list").hide();
  $(".wrapper-tags-label").click(function(ev) {
    ev.preventDefault();
    var $el = $(this);
    if ($el.hasClass("active")) {
      $el.removeClass("active");
      $(".wrapper-tags-list", $el.parent()).hide();
    }
    else {
      $el.addClass("active");
      $(".wrapper-tags-list", $el.parent()).show();
    }
  });

});