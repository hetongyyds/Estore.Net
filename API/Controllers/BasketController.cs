using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController:BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name="GetBasket")]

        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            Basket basket = await RetriveBasket();

            if (basket == null) return NotFound();
            return MapBasketDTO(basket);

        }

       


        [HttpPost]

        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity){
            var basket = await RetriveBasket();

            if(basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if(product==null) return NotFound();

            basket.AddItem(product,quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket",MapBasketDTO(basket));

            return BadRequest(new ProblemDetails{Title= "Problem saving product add item to basket"});




        }
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity){
            var basket = await RetriveBasket();
            if(basket == null) return NotFound();

            basket.RemoveItem(productId,quantity);
            var result = await _context.SaveChangesAsync();
            
            return Ok();
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookeiOptions = new CookieOptions{IsEssential =true,Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookeiOptions);
            var basket = new Basket{BuyerId=buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                        .Include(b => b.Items)
                        .ThenInclude(item => item.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

         private BasketDTO MapBasketDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,

                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    QuantityInCart = item.Quantity

                }).ToList()

            };
        }
    }
}