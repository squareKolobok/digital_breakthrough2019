using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trash.db;
using Trash.Models;

namespace Trash.ContrAndDB
{
    public interface ITrash
    {
        List<trashObj> GetTrash();

        List<t_tip> GetTypes();

        List<trashObj> GetTrashFilter(List<int> fltr);
    }
}
