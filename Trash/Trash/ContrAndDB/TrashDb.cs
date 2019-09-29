using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Trash.db;
using Trash.Models;

namespace Trash.ContrAndDB
{
    public class TrashDb : ITrash, IDisposable
    {
        private static readonly TrashDb tr = new TrashDb();

        private Trash.db.Trash db = new Trash.db.Trash();

        private TrashDb() { }

        public static TrashDb trash
        {
            get
            {
                return tr;
            }
        }

        public void Dispose()
        {
            db.Dispose();
        }

        /// <summary>
        /// Получить список мусорок
        /// </summary>
        public List<trashObj> GetTrash()
        {
            var r = db.t_trash.ToList().Select(x => new trashObj()
            {
                id = x.id,
                res = x.t_res.Select(y => new Res()
                    {
                        id = y.id,
                        ownerId = y.owner_id,
                        tipId = y.tip_id,
                        val = y.val
                    }).ToList(),
                x = x.x,
                y = x.y
            }).ToList();

            return r;
        }

        /// <summary>
        /// Получить список мусорок по фильтру
        /// </summary>
        /// <param name="fltr">список типов лопустимого мусора</param>
        public List<trashObj> GetTrashFilter(List<int> fltr)
        {
            var result = db.t_trash.ToList();
            var r = result.Where(x => x.t_res.Any(y => fltr.Any(z => z == (int)y.tip_id)));

            return r.Select(x => new trashObj()
            {
                id = x.id,
                res = x.t_res.Select(y => new Res()
                {
                    id = y.id,
                    ownerId = y.owner_id,
                    tipId = y.tip_id,
                    val = y.val
                }).ToList(),
                x = x.x,
                y = x.y
            }).ToList();

        }

        /// <summary>
        /// получить список мусорок оператора
        /// </summary>
        /// <param name="id">id оператора</param>
        public List<trashObj> GetTrashOperator(int id)
        {
            var oper = db.t_operators.FirstOrDefault(x => x.id == id);

            if (oper == null)
                return new List<trashObj>();

            return oper.t_oper_trash.Select(x => x.t_trash).Select(x => new trashObj()
            {
                id = x.id,
                res = x.t_res.Select(y => new Res()
                {
                    id = y.id,
                    ownerId = y.owner_id,
                    tipId = y.tip_id,
                    val = y.val
                }).ToList(),
                x = x.x,
                y = x.y
            }).ToList();
        }

        /// <summary>
        /// получить список типов
        /// </summary>
        /// <returns></returns>
        public List<t_tip> GetTypes()
        {
            return db.t_tip.ToList();
        }

        public LiderTrash Lider(int id)
        {
            using (var db1 = new Trash.db.Trash())
            {
                return db1.t_user_trash.Join(
                    db1.t_users,
                    x => x.user_id,
                    y => y.user_id,
                    (x, y) => new LiderTrash() { fio = y.fio, val = y.t_user_trash.Sum(z => (int)z.val_user) })
                    .FirstOrDefault();
            }
        }
    }
}