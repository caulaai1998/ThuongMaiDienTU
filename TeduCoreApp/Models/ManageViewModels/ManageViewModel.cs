using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeduCoreApp.Data.Enums;

namespace TeduCoreApp.Models.ManageViewModels
{
    public class ManageViewModel
    {
        public int BillId { get; set; }
        public BillStatus Billstatus { get; set; }
        public int ProductId { get; set; }
        public string SeoAlias { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
