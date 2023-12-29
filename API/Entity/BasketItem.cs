using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id{ get; set; }

        public int Quantity{ get; set; }

        
        public int ProductId{ get; set; }    //foreign key from entity product

        

        public Product Product{get; set; } //navagation relationship 

        public int BasketId{get; set; }

        public Basket Basket { get; set; }
    }
}