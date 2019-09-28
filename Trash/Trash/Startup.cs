using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Trash.Startup))]
namespace Trash
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
