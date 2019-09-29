using System.Web.Mvc;

namespace Trash.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Operator()
        {
            return View();
        }

        public ActionResult UserMap()
        {
            return View();
        }
    }
}