// from data.js
var tableData = data;

function appendTable(report) {
    var tbody = d3.select("tbody");

    var row = tbody.append("tr");

    Object.entries(report).forEach(([key, value]) => {

        var cell = row.append("td");
        cell.text(value);

    });
}

tableData.forEach(appendTable);

var submit = d3.select("#filter-btn");

var countries = [];
tableData.forEach(record => {
    if (!(countries.includes(record.country))) {
        countries.push(record.country)
    }
});

var countrySelect = d3.select('#countryDropdown');
countries.forEach(country => {
    var item = countrySelect.append("option");
    item.text(country.toUpperCase())
})

var shapes = [];
tableData.forEach(record => {
    if (!(shapes.includes(record.shape))) {
        shapes.push(record.shape)
    }
});

var shapeSelect = d3.select('#shapeDropdown');
shapes.forEach(shape => {
    var item = shapeSelect.append("option");
    item.text(shape)
})

countrySelect.on('change', function(){
    var selectedCountry = d3.select(this).property("value");

    var tableDataCountry = tableData.filter(record => record.country === selectedCountry);
    var states = [];
    tableDataCountry.forEach(record => {
        if (!(states.includes(record.state))) {
            states.push(record.state)
        }
    });
    var stateSelect = d3.select('#stateDropdown');
    states.forEach(state => {
        var item = stateSelect.append("option");
        item.text(state.toUpperCase())
    })
    var citySelect = d3.select('#cityDropdown');



stateSelect.on('change', function(){

    var selectedState = d3.select(this).property("value");
    var tableDataState = tableDataCountry.filter(record => record.state === selectedState);
    var cities = [];
    tableDataState.forEach(record => {
        if (!(cities.includes(record.city))) {
            cities.push(record.city)
        }
    });

    cities.forEach(city => {
        var item = citySelect.append("option");
        item.text(city)
    })
});
});


submit.on("click", function() {


    d3.select("tbody").html("");

    d3.event.preventDefault();

    var dateTime = d3.select("#datetime").property("value");
    console.log(`Date: ${dateTime}`);
    var selectedCountry = d3.select("#countryDropdown").property("value").toLowerCase();
    console.log(`Country: ${selectedCountry}`);
    var selectedState = d3.select("#stateDropdown").property("value").toLowerCase();
    console.log(`State: ${selectedState}`);
    var selectedCity = d3.select("#cityDropdown").property("value").toLowerCase();
    console.log(`City: ${selectedCity}`);
    var selectedShape = d3.select("#shapeDropdown").property("value").toLowerCase();
    console.log(`Shape: ${selectedShape}`);


    function filterTbl(data, key, selectedValue) {
        var filteredTbl = data.filter(record => 
            record[key] === selectedValue
        );
        return filteredTbl
    }


    var filteredTbl = tableData;
    if (dateTime) {
        filteredTbl = filterData(filteredTbl, 'datetime', dateTime)
    }
    if (selectedCountry !== "all") {
        filteredTbl = filterData(filteredTbl, 'country', selectedCountry)
    }
    if (selectedState !== "all") {
        filteredTbl = filterData(filteredTbl, 'state', selectedState)
    }
    if (selectedCity !== "all") {
        filteredTbl = filterData(filteredTbl, 'city', selectedCity)
    }
    if (selectedShape !== "all") {
        filteredTbl = filterData(filteredTbl, 'shape', selectedShape)
    }

    // Display the filtered dataset
    var flag = d3.select("#no-results");

    if (filteredData.length === 0) {
        var row = flag.append("h3");
        row.text("Cannot find any results.")
    }
    else {
        filteredTbl.forEach(appendTable);
    }
});