import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineLogout,
  HiX,
} from "react-icons/hi";
import Loader from "../components/UI/Loader.jsx";
import api from "../services/api.js";

const emptyProject = {
  slug: "",
  title: { fr: "", en: "" },
  client: "",
  context: { fr: "", en: "" },
  role: { fr: "", en: "" },
  solution: { fr: "", en: "" },
  results: { fr: "", en: "" },
  technologies: "",
  imageUrl: "",
  link: "",
};

const Admin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(null); // null = fermé, {} = création, {...} = édition
  const [savedMsg, setSavedMsg] = useState("");

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    api.get("/auth/me").catch(() => {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
    });
    loadProjects();
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProjects = () => {
    api.get("/projects").then((res) => setProjects(res.data));
  };
  const loadProfile = () => {
    api.get("/profile").then((res) => setProfile(res.data));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    navigate("/admin/login");
  };

  const openCreate = () => setEditing({ ...emptyProject });
  const openEdit = (project) =>
    setEditing({
      ...project,
      technologies: (project.technologies || []).join(", "),
    });

  const handleDelete = async (id) => {
    if (!window.confirm(t("admin.deleteConfirm"))) return;
    await api.delete(`/projects/${id}`);
    loadProjects();
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...editing,
      technologies: editing.technologies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editing._id) {
      await api.put(`/projects/${editing._id}`, payload);
    } else {
      await api.post("/projects", payload);
    }
    setEditing(null);
    loadProjects();
    flashSaved();
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await api.put("/profile", { bio: profile.bio });
    flashSaved();
  };

  const flashSaved = () => {
    setSavedMsg(t("admin.saved"));
    setTimeout(() => setSavedMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="bg-navy-800 text-white">
        <div className="container-section py-5 flex items-center justify-between">
          <h1 className="font-display font-bold text-lg">{t("admin.dashboard")}</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-navy-200 hover:text-terracotta-400 transition-colors"
          >
            <HiOutlineLogout /> {t("admin.logout")}
          </button>
        </div>
      </header>

      <div className="container-section py-8">
        <div className="flex gap-2 mb-8 border-b border-navy-100">
          {["projects", "profile"].map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                tab === tabKey
                  ? "border-terracotta-500 text-terracotta-600"
                  : "border-transparent text-navy-500 hover:text-navy-800"
              }`}
            >
              {t(`admin.${tabKey}Tab`)}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {savedMsg && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 inline-block bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-lg"
            >
              {savedMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {tab === "projects" && (
          <>
            <div className="flex justify-end mb-6">
              <button onClick={openCreate} className="btn-primary text-sm !px-5 !py-2.5">
                <HiOutlinePlus /> {t("admin.addProject")}
              </button>
            </div>

            {!projects ? (
              <Loader />
            ) : (
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-navy-50 text-navy-700 text-left">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Titre (FR)</th>
                      <th className="px-5 py-3 font-semibold">Client</th>
                      <th className="px-5 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project._id} className="border-t border-navy-50">
                        <td className="px-5 py-3 font-medium text-navy-800">
                          {project.title.fr}
                        </td>
                        <td className="px-5 py-3 text-navy-500">{project.client}</td>
                        <td className="px-5 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEdit(project)}
                              className="h-8 w-8 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-navy-100"
                              aria-label="Modifier"
                            >
                              <HiOutlinePencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100"
                              aria-label="Supprimer"
                            >
                              <HiOutlineTrash size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {tab === "profile" && profile && (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl shadow-card p-6 max-w-2xl space-y-5">
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                Biographie (Français)
              </label>
              <textarea
                rows={6}
                value={profile.bio.fr}
                onChange={(e) =>
                  setProfile({ ...profile, bio: { ...profile.bio, fr: e.target.value } })
                }
                className="w-full rounded-lg border border-navy-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1.5 block">
                Biography (English)
              </label>
              <textarea
                rows={6}
                value={profile.bio.en}
                onChange={(e) =>
                  setProfile({ ...profile, bio: { ...profile.bio, en: e.target.value } })
                }
                className="w-full rounded-lg border border-navy-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
              />
            </div>
            <button type="submit" className="btn-primary text-sm !px-6 !py-2.5">
              {t("admin.save")}
            </button>
          </form>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditing(null)}
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSaveProject}
              className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-navy-50 p-5 flex items-center justify-between">
                <h3 className="font-display font-bold text-navy-800">
                  {editing._id ? t("admin.editProject") : t("admin.addProject")}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="h-8 w-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-700"
                >
                  <HiX size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="Slug (unique)"
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm col-span-2"
                  />
                  <input
                    required
                    placeholder="Titre (FR)"
                    value={editing.title.fr}
                    onChange={(e) =>
                      setEditing({ ...editing, title: { ...editing.title, fr: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                  <input
                    required
                    placeholder="Title (EN)"
                    value={editing.title.en}
                    onChange={(e) =>
                      setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                </div>

                <input
                  placeholder="Client"
                  value={editing.client}
                  onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                  className="w-full rounded-lg border border-navy-100 px-3 py-2 text-sm"
                />

                <div className="grid grid-cols-2 gap-3">
                  <textarea
                    required
                    placeholder="Contexte (FR)"
                    rows={3}
                    value={editing.context.fr}
                    onChange={(e) =>
                      setEditing({ ...editing, context: { ...editing.context, fr: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                  <textarea
                    required
                    placeholder="Context (EN)"
                    rows={3}
                    value={editing.context.en}
                    onChange={(e) =>
                      setEditing({ ...editing, context: { ...editing.context, en: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <textarea
                    placeholder="Solution technique (FR)"
                    rows={3}
                    value={editing.solution.fr}
                    onChange={(e) =>
                      setEditing({ ...editing, solution: { ...editing.solution, fr: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Technical solution (EN)"
                    rows={3}
                    value={editing.solution.en}
                    onChange={(e) =>
                      setEditing({ ...editing, solution: { ...editing.solution, en: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <textarea
                    placeholder="Résultats (FR)"
                    rows={2}
                    value={editing.results.fr}
                    onChange={(e) =>
                      setEditing({ ...editing, results: { ...editing.results, fr: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Results (EN)"
                    rows={2}
                    value={editing.results.en}
                    onChange={(e) =>
                      setEditing({ ...editing, results: { ...editing.results, en: e.target.value } })
                    }
                    className="rounded-lg border border-navy-100 px-3 py-2 text-sm"
                  />
                </div>

                <input
                  placeholder="Technologies (séparées par des virgules)"
                  value={editing.technologies}
                  onChange={(e) => setEditing({ ...editing, technologies: e.target.value })}
                  className="w-full rounded-lg border border-navy-100 px-3 py-2 text-sm"
                />
                <input
                  placeholder="URL image (optionnel)"
                  value={editing.imageUrl}
                  onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-navy-100 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Lien externe (optionnel)"
                  value={editing.link}
                  onChange={(e) => setEditing({ ...editing, link: e.target.value })}
                  className="w-full rounded-lg border border-navy-100 px-3 py-2 text-sm"
                />
              </div>

              <div className="sticky bottom-0 bg-white border-t border-navy-50 p-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="btn-secondary text-sm !px-5 !py-2.5"
                >
                  {t("admin.cancel")}
                </button>
                <button type="submit" className="btn-primary text-sm !px-5 !py-2.5">
                  {t("admin.save")}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
