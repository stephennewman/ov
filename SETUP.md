# Outcomeview - Setup Guide

## 🚀 Quick Start

This is a real-time collaboration dashboard built with Next.js, Supabase, and Liveblocks.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier available)
- A Liveblocks account (free tier available)

### Installation

1. **Clone and install dependencies:**

```bash
cd /Users/stephennewman/ov
npm install
```

2. **Set up environment variables:**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your-liveblocks-key
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open the dashboard:**

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 🗄️ Database Setup (Supabase)

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to initialize

### 2. Run the SQL Schema

Copy the SQL from `database-schema.sql` and run it in the Supabase SQL Editor:

**Dashboard** → **SQL Editor** → **New Query** → Paste and Run

### 3. Get Your API Keys

1. Go to **Settings** → **API**
2. Copy the **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
3. Copy the **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

---

## 🔴 Real-Time Collaboration Setup (Liveblocks)

### 1. Create a Liveblocks Account

1. Go to [liveblocks.io](https://liveblocks.io)
2. Sign up for free (100 MAU included)
3. Create a new project

### 2. Get Your Public API Key

1. Go to your project dashboard
2. Copy the **Public API Key**
3. Add it to `.env.local` as NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY

### 3. Test Real-Time Features

- Open the dashboard in multiple browser tabs
- Watch cursors appear in real-time
- See user presence indicators update

---

## 🎨 Features

### ✅ Implemented

- **Real-time cursors** - See other users' mouse positions (Figma-style)
- **User presence** - Active user avatars with role badges
- **Live activity stream** - Airport-style departures board showing updates
- **Department overview** - Progress tracking by department
- **Task cards** - QR code generation for mobile access
- **Dark theme** - Professional healthcare operations interface
- **Mock data** - Demo mode works without backend setup

### 🔄 Demo Mode

The dashboard works in demo mode without Supabase/Liveblocks:
- Mock data simulates real tasks and departments
- Activities auto-generate every 8 seconds
- Real-time features work with Liveblocks only

### 📱 QR Code Feature

Each task can generate a QR code for mobile access:
- Click the "QR" button on any task card
- Scan with a mobile device
- Deep links to specific tasks (requires URL setup)

---

## 📊 Database Schema Overview

The schema includes these main tables:

- `profiles` - User information and roles (RN, FD, MD, FOS, etc.)
- `departments` - Clinical, Facilities, Radiology, Administration
- `checklists` - Daily, weekly, monthly operational checklists
- `tasks` - Individual items within checklists
- `activity_log` - Real-time activity tracking for the stream
- `collections` - Groupings of related checklists
- `leaderboard_stats` - Performance metrics and streaks

---

## 🏗️ Project Structure

```
/Users/stephennewman/ov/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── layout.tsx            # Liveblocks provider
│   │   └── components/
│   │       ├── DashboardHeader.tsx
│   │       ├── LiveStreamBoard.tsx
│   │       ├── ActiveUsers.tsx
│   │       ├── LiveCursors.tsx
│   │       ├── DepartmentGrid.tsx
│   │       ├── TaskCard.tsx
│   │       └── StatsWidget.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   ├── supabase.ts               # Database client
│   ├── liveblocks.ts             # Real-time collaboration
│   └── mockData.ts               # Demo data
└── hooks/
    └── (future custom hooks)
```

---

## 🎯 Usage

### Opening the Dashboard

Navigate to `/dashboard` to see:
1. **Header** - Facility selector, live mode toggle, sync status
2. **Stats widgets** - Task counts (completed, in progress, overdue)
3. **Department grid** - Progress by department
4. **Activity stream** - Real-time updates in airport board style
5. **Active users** - Right sidebar showing who's online

### Real-Time Features

**Cursors:**
- Move your mouse to broadcast cursor position
- See other users' cursors in real-time

**Presence:**
- User avatars appear in the right sidebar
- Hover to see what they're working on
- Colored indicators show activity

**Activity Stream:**
- New activities fade in with highlight
- Updates every few seconds
- Shows department, task, owner, status, timestamp

---

## 🔧 Customization

### Adding Departments

Edit `lib/mockData.ts` or add via Supabase:

```typescript
{
  name: 'New Department',
  icon: 'IconName',
  color: '#hexcolor',
  order_index: 5
}
```

### User Roles

Supported roles: `RN`, `FD`, `MD`, `FOS`, `Admin`, `Tech`

Add new roles in `lib/types.ts` and update the database schema.

### Colors and Theming

Edit `app/globals.css` for:
- Glow effects
- Color schemes
- Animation timings

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Production

Make sure to set in your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY`

---

## 📝 Next Steps

### Recommended Enhancements

1. **Authentication** - Add Supabase Auth for user login
2. **Task editing** - Allow updating task status from dashboard
3. **Notifications** - Real-time alerts for overdue items
4. **Leaderboard** - Display top performers
5. **Mobile app** - React Native companion app
6. **Reports** - Audit-ready compliance reports
7. **Signatures** - Digital signature capture
8. **Image upload** - Proof of completion photos

---

## 🐛 Troubleshooting

### Liveblocks cursors not showing
- Check if `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` is set
- Open dashboard in multiple tabs to test
- Check browser console for errors

### Supabase connection issues
- Verify API keys are correct
- Check if database schema is applied
- Enable Row Level Security (RLS) policies

### Build errors
- Run `npm install` to ensure all packages are installed
- Clear `.next` folder and rebuild
- Check Node.js version (18+ required)

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Liveblocks Documentation](https://liveblocks.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🤝 Support

For issues or questions, refer to:
- `AI_Onboarding.md` - Project history and changes
- Component comments - Inline documentation
- This file - Setup and configuration

---

**Built with ❤️ for healthcare operations teams**

