import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Hotel, Utensils, Bus, ShoppingBag, Ticket, TrendingDown, IndianRupee } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Expense {
  id: string;
  category: string;
  label: string;
  amount: number;
}

const CATEGORIES = [
  { id: "hotel", icon: Hotel, label: "Hotel", color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "food", icon: Utensils, label: "Food", color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "travel", icon: Bus, label: "Travel", color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "shopping", icon: ShoppingBag, label: "Shopping", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "activities", icon: Ticket, label: "Activities", color: "text-ts-green", bg: "bg-ts-green/10" },
];

interface Props {
  onBack: () => void;
}

export default function BudgetTrackerView({ onBack }: Props) {
  const { t } = useTranslation();
  const [totalBudget, setTotalBudget] = useState(10000);
  const [editingBudget, setEditingBudget] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("food");
  const [newLabel, setNewLabel] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  const addExpense = () => {
    if (!newAmount || parseFloat(newAmount) <= 0) return;
    setExpenses((prev) => [
      ...prev,
      { id: Date.now().toString(), category: newCategory, label: newLabel || CATEGORIES.find(c => c.id === newCategory)?.label || "Other", amount: parseFloat(newAmount) },
    ]);
    setNewLabel("");
    setNewAmount("");
    setShowAdd(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const categoryTotals = CATEGORIES.map((cat) => ({
    ...cat,
    total: expenses.filter((e) => e.category === cat.id).reduce((s, e) => s + e.amount, 0),
  }));

  const suggestions = remaining < totalBudget * 0.2
    ? ["Consider budget hostels instead of hotels", "Try local street food for cheaper meals", "Use public transport instead of cabs"]
    : [];

  return (
    <div className="h-full overflow-y-auto ts-scrollbar-hide">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-display font-bold text-foreground">{t("feat_budget_tracker" as any)}</h1>
          <p className="text-[10px] text-muted-foreground">Track every rupee of your trip</p>
        </div>
      </div>

      {/* Budget overview card */}
      <div className="px-5 mb-4">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="ts-gradient-hero rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_60%)]" />
          <div className="relative z-10">
            <p className="text-primary-foreground/60 text-xs mb-1">Total Budget</p>
            {editingBudget ? (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary-foreground text-xl font-bold">₹</span>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  onBlur={() => setEditingBudget(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingBudget(false)}
                  autoFocus
                  className="bg-primary-foreground/20 text-primary-foreground text-xl font-bold rounded-lg px-2 py-1 w-32 outline-none"
                />
              </div>
            ) : (
              <button onClick={() => setEditingBudget(true)} className="text-2xl font-bold text-primary-foreground mb-3 flex items-center gap-1">
                <IndianRupee className="w-5 h-5" />{totalBudget.toLocaleString("en-IN")}
              </button>
            )}

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-primary-foreground/20 rounded-full mb-2">
              <motion.div
                className={`h-full rounded-full ${remaining < 0 ? "bg-destructive" : "bg-primary-foreground"}`}
                initial={{ width: 0 }}
                animate={{ width: `${spentPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-primary-foreground/70">
              <span>Spent: ₹{totalSpent.toLocaleString("en-IN")}</span>
              <span className={remaining < 0 ? "text-destructive font-bold" : ""}>
                {remaining < 0 ? "Over by" : "Left"}: ₹{Math.abs(remaining).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category breakdown */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-bold text-foreground mb-3">Spending by Category</h3>
        <div className="grid grid-cols-5 gap-2">
          {categoryTotals.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="flex flex-col items-center gap-1.5 bg-card p-2.5 rounded-2xl border border-border">
                <div className={`${cat.bg} p-2 rounded-xl`}>
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                </div>
                <span className="text-[9px] font-bold text-foreground">{cat.label}</span>
                <span className="text-[9px] text-muted-foreground">₹{cat.total.toLocaleString("en-IN")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add expense button */}
      <div className="px-5 mb-3">
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary py-3 rounded-xl text-sm font-bold active:scale-95 transition"
        >
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      {/* Add expense form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 mb-4 overflow-hidden">
            <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.id} onClick={() => setNewCategory(cat.id)}
                      className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition ${newCategory === cat.id ? `${cat.bg} ring-2 ring-offset-1 ring-current ${cat.color}` : "bg-muted"}`}>
                      <Icon className={`w-3.5 h-3.5 ${newCategory === cat.id ? cat.color : "text-muted-foreground"}`} />
                      <span className="text-[8px] font-bold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
              <input
                placeholder="Label (optional)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full bg-muted rounded-xl px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none"
              />
              <input
                placeholder="Amount (₹)"
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full bg-muted rounded-xl px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button onClick={addExpense} className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-bold active:scale-95 transition">
                Add ₹{newAmount || "0"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expense list */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-bold text-foreground mb-2">Recent Expenses</h3>
        {expenses.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <IndianRupee className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No expenses yet. Start tracking!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {expenses.map((exp) => {
              const cat = CATEGORIES.find((c) => c.id === exp.category);
              const Icon = cat?.icon || Ticket;
              return (
                <motion.div key={exp.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-3 bg-card rounded-xl border border-border p-3">
                  <div className={`${cat?.bg || "bg-muted"} p-2 rounded-lg`}>
                    <Icon className={`w-3.5 h-3.5 ${cat?.color || "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{exp.label}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{exp.category}</p>
                  </div>
                  <span className="text-xs font-bold text-foreground">₹{exp.amount.toLocaleString("en-IN")}</span>
                  <button onClick={() => deleteExpense(exp.id)} className="text-muted-foreground hover:text-destructive transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-5 mb-5">
          <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-ts-green" /> Save Money Tips
          </h3>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 bg-ts-green/5 border border-ts-green/20 rounded-xl p-3">
                <span className="text-ts-green text-xs">💡</span>
                <p className="text-xs text-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="h-24 md:h-8" />
    </div>
  );
}
