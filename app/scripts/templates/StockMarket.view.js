module.exports = function(component){
    var template =
        "<div id='companies'>" +
            generateCompaniesTemplate(component.getCompanies()) +
        "</div>";

    function generateCompaniesTemplate(companies){
        var template = "";
        for(company in companies)
            template += getCompanyTemplate(companies[company]);
        return template;
    }

    function getCompanyTemplate(company){
        return(
            "<div class='company'>" +
                "<h1>" + company.name + "</h1>" +
            "<h2>Value/Share: " + Math.round(company.value) + " Trend: " + company.stockTrend.status + "</h2>" +
            "</div>"
        );
    }

    return template;
};