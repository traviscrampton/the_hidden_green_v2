# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170911181943) do

  create_table "debts", force: :cascade do |t|
    t.string   "name"
    t.string   "debtable_type"
    t.integer  "debtable_id"
    t.float    "amount"
    t.float    "interest_rate"
    t.float    "minimum_payment"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "incomes", force: :cascade do |t|
    t.integer  "incomeable_id"
    t.string   "incomeable_type"
    t.string   "name"
    t.float    "amount"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "months", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.integer  "sequence_num"
    t.datetime "date"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "savings", force: :cascade do |t|
    t.float    "amount"
    t.integer  "savingable_id"
    t.string   "savingable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "spendings", force: :cascade do |t|
    t.float    "amount"
    t.integer  "spendable_id"
    t.string   "spendable_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
