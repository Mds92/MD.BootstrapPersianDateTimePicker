using System.Web;
using System.Web.Mvc;

namespace MD.BootstrapPersianDateTimePicker
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
        }
    }
}
