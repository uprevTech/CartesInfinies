using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;
using SuperCartesInfinies.Models;

[assembly: OwinStartup(typeof(SuperCartesInfinies.Startup))]

namespace SuperCartesInfinies
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            Task t = CreateUser();
        }
        public async Task CreateUser()
        {
            ApplicationDbContext context = new ApplicationDbContext();

            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            var user = new ApplicationUser();
            ApplicationUser test = UserManager.FindByEmail("a@a.a");

            if (test == null)
            {
                user.UserName = "a@a.a";
                user.Email = "a@a.a";

                string userPWD = "Password1!";

                var result = await UserManager.CreateAsync(user, userPWD);

                for (int i = 0; i < 10; i++)
                {
                    Card newCard = new Card
                    {
                        Attack = i + 1,
                        Defense = i + 2,
                        Cost = i + 1,
                        Name = "CardNo" + i,
                        Image = "../../assets/images/mtgCaster.jpg"
                    };
                    context.Cards.Add(newCard);
                    context.SaveChanges();
                }
            }
        }
    }
}


