    var students = [
      { name: 'Minh', age: 20 },
      { name: 'Hoang', age: 20 },
      { name: 'Hai', age: 18 },
      { name: 'Duy', age: 18 },
      { name: 'Tung', age: 19 }
    ];
    var ageFilter = document.getElementById('age-filter');
    ageFilter.addEventListener('change', onAgeFilterChange);
    function onAgeFilterChange() {
      // get current value of the select
      var selectedAge = parseInt(ageFilter.value);
      // filter the student list by the selected value
      var filteredStudents = students.filter(function(student) {
        return student.age === selectedAge;
      });
      // render
      render(filteredStudents);
    }