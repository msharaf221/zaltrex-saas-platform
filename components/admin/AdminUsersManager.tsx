"use client";

import React, { useState } from "react";
import { createAdminUser, deleteAdminUser, updateAdminPassword, updateAdminRole } from "@/app/actions/admin";

export interface UserRecord {
  id: string;
  name?: string | null;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: Date | string;
}

interface AdminUsersManagerProps {
  initialUsers: UserRecord[];
}

export default function AdminUsersManager({ initialUsers }: AdminUsersManagerProps) {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [passwordModalUser, setPasswordModalUser] = useState<UserRecord | null>(null);

  // Add Admin form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"ADMIN" | "USER">("ADMIN");

  // Change password state
  const [newPasswordVal, setNewPasswordVal] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showAlert = (type: "success" | "error", msg: string) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPassword) {
      showAlert("error", "الرجاء إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setLoading(true);
    const res = await createAdminUser({
      name: newName,
      email: newEmail,
      password: newPassword,
      role: newRole,
    });
    setLoading(false);

    if (res.success && res.user) {
      setUsers([res.user as UserRecord, ...users]);
      setShowAddModal(false);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      showAlert("success", `✔ تم إنشاء حساب الأدمن الجديد (${res.user.email}) بنجاح!`);
    } else {
      showAlert("error", `❌ فشل في إنشاء الأدمن: ${res.error}`);
    }
  };

  const handleDelete = async (user: UserRecord) => {
    if (!confirm(`هل أنت متأكد من حذف الأدمن (${user.name || user.email}) نهائياً؟ لن يتمكن من تسجيل الدخول بعد ذلك.`)) {
      return;
    }

    setLoading(true);
    const res = await deleteAdminUser(user.id);
    setLoading(false);

    if (res.success) {
      setUsers(users.filter((u) => u.id !== user.id));
      showAlert("success", `✔ تم حذف حساب (${user.email}) بنجاح.`);
    } else {
      showAlert("error", `❌ ${res.error}`);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModalUser || !newPasswordVal) return;

    if (newPasswordVal.length < 6) {
      showAlert("error", "كلمة المرور يجب أن لا تقل عن 6 أحرف.");
      return;
    }

    setLoading(true);
    const res = await updateAdminPassword(passwordModalUser.id, newPasswordVal);
    setLoading(false);

    if (res.success) {
      setPasswordModalUser(null);
      setNewPasswordVal("");
      showAlert("success", `✔ تم تغيير كلمة المرور للمستخدم (${passwordModalUser.email}) بنجاح.`);
    } else {
      showAlert("error", `❌ ${res.error}`);
    }
  };

  const handleRoleToggle = async (user: UserRecord, role: "ADMIN" | "USER") => {
    const res = await updateAdminRole(user.id, role);
    if (res.success) {
      setUsers(users.map((u) => (u.id === user.id ? { ...u, role } : u)));
      showAlert("success", `✔ تم تحديث صلاحية (${user.email}) إلى ${role}.`);
    } else {
      showAlert("error", `❌ ${res.error}`);
    }
  };

  const PRIMARY_ADMIN_EMAIL = "muhamedhussein1105@gmail.com";

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-obsidian-900/90 border border-white/[0.08] p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 mb-2">
            <span>Security &amp; IAM</span>
            <span>•</span>
            <span>صلاحيات الوصول</span>
          </div>
          <h2 className="text-xl font-black text-white font-sans">
            إدارة المشرفين والمسؤولين (Admins &amp; Team)
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            تحكم في من يملك صلاحية الدخول والتعديل على لوحة تحكم Zaltrex. يمكنك إضافة أدمنز جدد، تعيين الصلاحيات، أو تغيير كلمات المرور في أي وقت.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-mono font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
        >
          <span>+ إضافة أدمن جديد</span>
        </button>
      </div>

      {/* Alert Notification */}
      {alert && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border transition-all ${
            alert.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/60 border-red-500/40 text-red-300"
          }`}
        >
          {alert.msg}
        </div>
      )}

      {/* Admins Table / List */}
      <div className="bg-obsidian-900/80 border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            قائمة المسؤولين ({users.length})
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            {users.filter((u) => u.role === "ADMIN").length} مسؤول بصلاحيات كاملة
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-obsidian-950 text-slate-400 font-mono text-[11px] uppercase border-b border-white/[0.06]">
              <tr>
                <th className="px-6 py-3.5">المسؤول (Name &amp; Email)</th>
                <th className="px-6 py-3.5">الصلاحية (Role)</th>
                <th className="px-6 py-3.5">تاريخ الإضافة</th>
                <th className="px-6 py-3.5 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300 font-mono">
              {users.map((user) => {
                const isPrimary = user.email.toLowerCase() === PRIMARY_ADMIN_EMAIL;

                return (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* User info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase ${
                            isPrimary
                              ? "bg-gradient-to-br from-indigo-500/40 to-cyan-500/40 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-500/20"
                              : "bg-white/[0.06] text-slate-300 border border-white/10"
                          }`}
                        >
                          {(user.name || user.email).charAt(0)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white font-sans text-sm">
                              {user.name || "مستخدم بدون اسم"}
                            </span>
                            {isPrimary && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/40 flex items-center gap-1">
                                <span>🌟</span>
                                <span>Super Admin</span>
                              </span>
                            )}
                          </div>
                          <div className="text-slate-400 text-xs mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      {isPrimary ? (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          ADMIN
                        </span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleToggle(user, e.target.value as "ADMIN" | "USER")}
                          className="bg-obsidian-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400 cursor-pointer"
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                        </select>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500 text-[11px]">
                      {new Date(user.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => {
                            setPasswordModalUser(user);
                            setNewPasswordVal("");
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer flex items-center gap-1"
                          title="تغيير كلمة المرور"
                        >
                          <span>🔑</span>
                          <span>كلمة المرور</span>
                        </button>

                        {!isPrimary && (
                          <button
                            onClick={() => handleDelete(user)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs transition-colors cursor-pointer flex items-center gap-1 border border-red-500/20"
                            title="حذف الأدمن"
                          >
                            <span>🗑️</span>
                            <span>حذف</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD ADMIN */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-obsidian-900 border border-white/15 rounded-2xl p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>➕</span>
                <span>إضافة مسؤول جديد للوحة التحكم</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-300 block mb-1">الاسم الكامل (Full Name)</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: أحمد مصطفى"
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">البريد الإلكتروني (Email Address)</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="admin@zaltrex.cloud"
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">كلمة المرور (Password)</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="لا تقل عن 6 أحرف"
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">الصلاحية (Role)</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as "ADMIN" | "USER")}
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="ADMIN">ADMIN (صلاحية كاملة للمحتوى والمشاريع والمقالات)</option>
                  <option value="USER">USER (مستخدم عادي)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 text-xs cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {loading ? "جاري الإنشاء..." : "إنشاء الأدمن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CHANGE PASSWORD */}
      {passwordModalUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-obsidian-900 border border-white/15 rounded-2xl p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🔑</span>
                <span>تغيير كلمة المرور</span>
              </h3>
              <button
                onClick={() => setPasswordModalUser(null)}
                className="text-slate-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              المستخدم: <span className="text-cyan-300 font-bold">{passwordModalUser.email}</span>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-300 block mb-1">كلمة المرور الجديدة (New Password)</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPasswordVal}
                  onChange={(e) => setNewPasswordVal(e.target.value)}
                  placeholder="أدخل كلمة المرور الجديدة"
                  className="w-full bg-obsidian-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPasswordModalUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 text-xs cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
