using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController:ControllerBase
    {
        private readonly StoreContext _context;
        public ProductController(StoreContext context)
        {
            _context = context;
            
            
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(){
         return await _context.Products.ToListAsync();
            
        }

        [HttpGet("{id}")]
        public async Task <ActionResult<Product>> GetProductByID(int id){
            return await _context.Products.FindAsync(id);
        }

    }
}