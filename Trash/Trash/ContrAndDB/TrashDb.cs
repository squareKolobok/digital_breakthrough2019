﻿using System;
using System.Collections.Generic;
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
            return db.t_trash.ToList().Select(x => new trashObj()
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
        /// получить список типов
        /// </summary>
        /// <returns></returns>
        public List<t_tip> GetTypes()
        {
            return db.t_tip.ToList();
        }
    }
}