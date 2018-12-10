using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using SuperCartesInfinies.Models;
using SuperCartesInfinies.Models.DTO;

namespace SuperCartesInfinies.Controllers
{
    [Authorize]
    public class DecksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        private ApplicationUserManager _userManager;

        public DecksController()
        {

        }

        public DecksController(ApplicationUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            //AccessTokenFormat = accessTokenFormat;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: api/Decks
        [Route("api/Decks/GetDecks")]
        public List<DeckDTO> GetDecks()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            string currentUserId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.FirstOrDefault(x => x.Id == currentUserId);

            List<DeckDTO> output = new List<DeckDTO>();
            foreach (Deck deck in currentUser.Decks)
            {
                List<Card> cardsInDeck = deck.Cards.ToList();

            };


            return output;
        }

        // GET: api/Decks/5
        [ResponseType(typeof(Deck))]
        public IHttpActionResult GetDeck(int id)
        {
            Deck deck = db.Decks.Find(id);
            if (deck == null)
            {
                return NotFound();
            }

            return Ok(deck);
        }

        // PUT: api/Decks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDeck(int id, Deck deck)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deck.DeckId)
            {
                return BadRequest();
            }

            db.Entry(deck).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeckExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Decks
        [ResponseType(typeof(Deck))]
        public IHttpActionResult PostDeck(Deck deck)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Decks.Add(deck);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = deck.DeckId }, deck);
        }

        // DELETE: api/Decks/5
        [ResponseType(typeof(Deck))]
        public IHttpActionResult DeleteDeck(int id)
        {
            Deck deck = db.Decks.Find(id);
            if (deck == null)
            {
                return NotFound();
            }

            db.Decks.Remove(deck);
            db.SaveChanges();

            return Ok(deck);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeckExists(int id)
        {
            return db.Decks.Count(e => e.DeckId == id) > 0;
        }
    }
}