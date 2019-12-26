using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeduCoreApp.Models;
using Microsoft.AspNetCore.Authorization;
using TeduCoreApp.Extensions;
using TeduCoreApp.Application.Interfaces;

namespace TeduCoreApp.Controllers
{
    public class HomeController : Controller
    {
        private IProductService _productService;
        private IProductCategoryService _productCategoryService;

        private IBlogService _blogService;
        private ICommonService _commonService;

        public HomeController(IProductService productService,
        IBlogService blogService, ICommonService commonService,
       IProductCategoryService productCategoryService)
        {
            _blogService = blogService;
            _commonService = commonService;
            _productService = productService;
            _productCategoryService = productCategoryService;
        }

        public IActionResult Index()
        {
            ViewData["BodyClass"] = "cms-index-index cms-home-page";
            var homeVm = new HomeViewModel();
            homeVm.HomeCategories = _productCategoryService.GetHomeCategories(20);
            homeVm.HotProducts = _productService.GetHotProduct(20);
            homeVm.TopSellProducts = _productService.GetLastest(20);
            homeVm.LastestBlogs = _blogService.GetLastest(20);
            homeVm.HomeSlides = _commonService.GetSlides("top");
            return View(homeVm);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
