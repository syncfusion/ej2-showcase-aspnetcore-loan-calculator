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
            ViewBag.animation = new { enable = true };
            ViewBag.majorGridLines = new { width = 0.00001 };
            ViewBag.minorGridLines = new { width = 0.00001 };
            ViewBag.majorTickLines = new { width = 0.00001 };
            ViewBag.minorTickLines = new { width = 0.00001 };
            ViewBag.lineStyle = new { width = 1, dashArray = "2", color = "rgba(255,255,255,0.2)" };
            ViewBag.labelStyle = new { color = "#989CA9", fontFamily = "Roboto", fontWeight = "400", size = "12px" };
            ViewBag.titleStyle = new ChartFont { Color = "#FFFFFF", FontFamily = "Raleway, sans-serif", FontWeight = "600", Size = "16px", Opacity = 0.62 }; 

            ViewBag.yAxisMajorGridLines = new { width = 1, dashArray = "2", color = "rgba(255,255,255,0.2)" };
            ViewBag.yAxisMinorGridLines = new { width = 0.0001 };
            ViewBag.yAxisMajorTickLines = new { width = 0.00001 };
            ViewBag.yAxisMinorTickLines = new { width = 0.00001 };
            ViewBag.yAxisLineStyle = new { width = 0.00001 };
            ViewBag.yAxisLabelStyle = new { color = "#989CA9", fontFamily = "Roboto", fontWeight = "400", size = "16px" };
            ViewBag.yAxisTitleStyle = new ChartFont { Color = "#FFFFFF", FontFamily = "Raleway, sans-serif", FontWeight = "600", Size = "16px", Opacity = 0.62 };

            ViewBag.axesMajorGridLines = new { width = 0.00001 };
            ViewBag.axesMinorGridLines = new { width = 0.00001 };
            ViewBag.axesMajorTickLines = new { width = 0.00001 };
            ViewBag.axesMinorTickLines = new { width = 0.00001 };
            ViewBag.axesLineStyle = new { width = 0.00001 };
            ViewBag.axesLabelStyle = new { color = "#989CA9", fontFamily = "Roboto", fontWeight = "400", size = "16px" };
            ViewBag.axesTitleStyle = new ChartFont { Color = "#FFFFFF", FontFamily = "Raleway, sans-serif", FontWeight = "600", Size = "16px", Opacity = 0.62 };

            ViewBag.tooltipTextStyle = new { color = "#555555", fontFamily = "Roboto", fontWeight = "400", size = "12px" };

            ViewBag.chartAreaBorder = new ChartBorder { Width = 0 };
            ViewBag.palettes = new string[] { "#FB6589", "#3AC8DC", "#FFFFFF" };

            ViewBag.legendTextStyle = new { color = "#FFFFFF", fontFamily = "Raleway, sans-serif", fontWeight = "600", size = "16px", opacity = 0.62 };
            ViewBag.childGrid = new { };
            ViewBag.markerSeries1 = new { visible = true, width = 10, height = 10 };
            ViewBag.markerSeries2 = new { visible = true, width = 10, height = 10 };
            ViewBag.markerSeries3 = new { visible = true, width = 10, height = 10, fill = "#60448D" };
            return View();
        }
    }
}