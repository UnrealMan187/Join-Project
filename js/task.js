<<<<<<< HEAD
function clickOnUrgent()
{   
    document.getElementById('urgent').classList.remove('btn-bg-change-back-onclick'); 
    document.getElementById('urgent').classList.add('btn-bg-change-urgent-onclick');
    document.getElementById('urgent').style.boxShadow ="none"

    document.getElementById('low').classList.add('btn-bg-change-back-onclick');
    document.getElementById('low').style.boxShadow ="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);"

    document.getElementById('medium').classList.add('btn-bg-change-back-onclick');
    document.getElementById('medium').style.boxShadow ="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);"
}

function clickOnMedium()
{
    document.getElementById('medium').classList.remove('btn-bg-change-back-onclick');
    document.getElementById('medium').classList.add('btn-bg-change-medium-onclick');
    document.getElementById('medium').style.boxShadow ="none"

    document.getElementById('urgent').classList.add('btn-bg-change-back-onclick');
    document.getElementById('urgent').style.boxShadow ="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);"

    document.getElementById('low').classList.add('btn-bg-change-back-onclick');
    document.getElementById('low').style.boxShadow ="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);"
}

function clickOnLow()
{
    document.getElementById('low').classList.remove('btn-bg-change-back-onclick');
    document.getElementById('low').classList.add('btn-bg-change-low-onclick');
    document.getElementById('low').style.boxShadow ="none"

    document.getElementById('medium').classList.add('btn-bg-change-back-onclick');
    document.getElementById('medium').style.boxShadow ="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);"

    document.getElementById('urgent').classList.add('btn-bg-change-back-onclick');
    document.getElementById('urgent').style.boxShadow ="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.30);"
}
=======
/*Begin dropdown assigned to*/
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.closest('.select.assigned-to')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
/*End dropdown assigned to*/
>>>>>>> 885e74524dfa080bc2549d5ff77e4a98012dd665
