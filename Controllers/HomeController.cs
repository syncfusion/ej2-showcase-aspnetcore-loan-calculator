using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.Charts;

namespace EJ2CoreSampleBrowser.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.titleStyle = new ChartFont { Color = "#FFFFFF", FontFamily = "Raleway, sans-serif", FontWeight = "600", Size = "16px", Opacity = 0.62 }; 

            ViewBag.yAxisTitleStyle = new ChartFont { Color = "#FFFFFF", FontFamily = "Raleway, sans-serif", FontWeight = "600", Size = "16px", Opacity = 0.62 };

            ViewBag.axesTitleStyle = new ChartFont { Color = "#FFFFFF", FontFamily = "Raleway, sans-serif", FontWeight = "600", Size = "16px", Opacity = 0.62 };
            ViewBag.palettes = new string[] { "#FB6589", "#3AC8DC", "#FFFFFF" };
            ViewBag.childGrid = new { };
            return View();
        }
    }
}