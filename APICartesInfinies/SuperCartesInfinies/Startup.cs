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

                CreateBasicCards(context);


                //for (int i = 0; i < 10; i++)
                //{
                //    Card newCard = new Card
                //    {
                //        Attack = i + 1,
                //        Defense = i + 2,
                //        Cost = i + 1,
                //        Name = "CardNo" + i,
                //        Image = "../../assets/images/mtgCaster.jpg"
                //    };
                //    context.Cards.Add(newCard);
                //    context.SaveChanges();
                //}
            }
        }
        public void CreateBasicCards(ApplicationDbContext context)
        {
            Card mf = new Card
            {
                Attack = 1,
                Defense = 9,
                Cost = 100,
                Name = "Feverish Malandrin",
                Image = "../../assets/images/malandrinFebrile.jpg"
            };
            context.Cards.Add(mf);
            Card ie = new Card
            {
                Attack = 2,
                Defense = 8,
                Cost = 100,
                Name = "Furious Iconoclast",
                Image = "../../assets/images/iconoclasteEndiable.jpg"
            };
            context.Cards.Add(ie);
            Card sm = new Card
            {
                Attack = 3,
                Defense = 7,
                Cost = 100,
                Name = "Dishonest Sycophant",
                Image = "../../assets/images/sycophanteMalhonnete.jpg"
            };
            context.Cards.Add(sm);
            Card zz = new Card
            {
                Attack = 4,
                Defense = 6,
                Cost = 100,
                Name = "Zealous Zouave",
                Image = "../../assets/images/zouaveZele.jpg"
            };
            context.Cards.Add(zz);
            Card fi = new Card
            {
                Attack = 5,
                Defense = 5,
                Cost = 100,
                Name = "Irreverent Forban",
                Image = "../../assets/images/forbanIrreverencieux.jpg"
            };
            context.Cards.Add(fi);
            Card mpa = new Card
            {
                Attack = 5,
                Defense = 5,
                Cost = 100,
                Name = "Marmiton Party Animal",
                Image = "../../assets/images/marmitonFetard.jpg"
            };
            context.Cards.Add(mpa);
            Card bm = new Card
            {
                Attack = 7,
                Defense = 3,
                Cost = 100,
                Name = "Clumsy Barber",
                Image = "../../assets/images/barbierMaladroit.jpg"
            };
            context.Cards.Add(bm);
            Card ee = new Card
            {
                Attack = 8,
                Defense = 2,
                Cost = 100,
                Name = "Energetic Vacuum Cleaner",
                Image = "../../assets/images/eboueurEnergique.jpg"
            };
            context.Cards.Add(ee);
            Card s = new Card
            {
                Attack = 9,
                Defense = 1,
                Cost = 100,
                Name = "Socrates",
                Image = "../../assets/images/socrate.jpg"
            };
            context.Cards.Add(s);
            Card aa = new Card
            {
                Attack = 5,
                Defense = 3,
                Cost = 60,
                Name = "Sprinkler Watered",
                Image = "../../assets/images/arroseurArrose.jpg"
            };
            context.Cards.Add(aa);
            Card ei = new Card
            {
                Attack = 6,
                Defense = 2,
                Cost = 60,
                Name = "Industrial Spy",
                Image = "../../assets/images/espionIndustriel.jpg"
            };
            context.Cards.Add(ei);
            Card af = new Card
            {
                Attack = 7,
                Defense = 2,
                Cost = 60,
                Name = "Fierce Scammer",
                Image = "../../assets/images/arnaqueurFeroce.jpg"
            };
            context.Cards.Add(af);
            Card je = new Card
            {
                Attack = 3,
                Defense = 3,
                Cost = 60,
                Name = "Young Student",
                Image = "../../assets/images/jeuneEtudiant.jpg"
            };
            context.Cards.Add(je);
            Card mv = new Card
            {
                Attack = 4,
                Defense = 2,
                Cost = 60,
                Name = "Swift Merchant",
                Image = "../../assets/images/marchandVeloce.jpg"
            };
            context.Cards.Add(mv);
            Card ap = new Card
            {
                Attack = 3,
                Defense = 4,
                Cost = 60,
                Name = "Public Entertainer",
                Image = "../../assets/images/amuseurPublic.jpg"
            };
            context.Cards.Add(ap);
            Card mi = new Card
            {
                Attack = 2,
                Defense = 5,
                Cost = 60,
                Name = "Indignant Protester",
                Image = "../../assets/images/manifestantIndigne.jpg"
            };
            context.Cards.Add(mi);
            Card jmn = new Card
            {
                Attack = 10,
                Defense = 10,
                Cost = 300,
                Name = "Jean-Michel Nadeau",
                Image = "../../assets/images/jeanMichelNadeau.jpg"
            };
            context.Cards.Add(jmn);
            Card ab = new Card
            {
                Attack = 5,
                Defense = 10,
                Cost = 300,
                Name = "Antoine Bélance",
                Image = "../../assets/images/antoineBelance.jpg"
            };
            context.Cards.Add(ab);
            Card gs = new Card
            {
                Attack = 10,
                Defense = 10,
                Cost = 300,
                Name = "Gabriel Séguin",
                Image = "../../assets/images/gabrielSeguin.jpg"
            };
            context.Cards.Add(gs);
            Card aal = new Card
            {
                Attack = 10,
                Defense = 10,
                Cost = 300,
                Name = "Alexandre Allain",
                Image = "../../assets/images/alexandreAllain.jpg"
            };
            context.Cards.Add(aal);
            context.SaveChanges();
        }
    }
}


