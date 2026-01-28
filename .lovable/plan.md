

# Educational Tour Fundraising Website Plan

## Project Overview
An interactive fundraising website for BS Computer Science students' educational tour to Manila, Cavite, and Laguna. The site will feature a vibrant, youthful design with colorful gradients, smooth animations, and a backend database to track donations automatically.

---

## Pages & Features

### 1. **Homepage / Hero Section**
- Eye-catching hero banner with vibrant gradient background
- Tour title: "Educational Tour 2025: Explore. Learn. Grow."
- Brief explanation of the tour's purpose and benefits for students
- Call-to-action button: "Donate Now" that scrolls to donation section
- Animated elements and smooth scroll behavior

### 2. **About the Tour Section**
- Description of the educational goals
- Benefits for participating students (hands-on learning, industry exposure, cultural enrichment)
- Number of students participating (placeholder: 40 students)

### 3. **Itinerary Section**
- **Day 1 - Manila**: National Museum, Intramuros, Mind Museum
- **Day 2 - Cavite**: Aguinaldo Shrine, historical sites
- **Day 3 - Laguna**: UPLB, Makiling Botanic Gardens, local tech companies
- Interactive cards with icons for each destination
- Educational objectives for each stop

### 4. **Progress Tracker**
- Visual progress bar showing amount raised vs ₱50,000 goal
- Animated fill effect as donations increase
- Percentage complete display
- Real-time updates from database

### 5. **Donation Section**
- GCash as primary payment method
- Placeholder QCash number and QR code area
- Step-by-step donation instructions:
  1. Open GCash app
  2. Send to the displayed number
  3. Take a screenshot
  4. Submit donation form
- Donation submission form (name, amount, optional message, anonymous option)

### 6. **Leaderboard Section**
- Top 10 donors displayed in a ranked list
- Shows donor name (or "Anonymous"), amount, and date
- Animated entrance effects
- Trophy icons for top 3 donors
- Real-time updates from database

### 7. **Organizers / Contact Section**
- Organizer information (placeholder for Feanne Malasarte and team)
- Contact email and phone number
- Social media links (placeholders)
- Trust badges and transparency statement

### 8. **Footer**
- Quick navigation links
- Copyright and school information

---

## Design Elements

### Color Palette (Vibrant & Youthful)
- Primary gradient: Pink to Purple to Blue
- Accent colors: Bright coral, teal, yellow highlights
- Clean white backgrounds with colorful sections
- Dark text for readability

### Animations & Interactions
- Smooth scrolling between sections
- Hover effects on buttons and cards
- Progress bar animation
- Fade-in animations on scroll
- Confetti effect when reaching donation milestones

### Mobile Responsive
- Fully responsive design for phones and tablets
- Touch-friendly buttons and navigation
- Collapsible mobile menu

---

## Backend (Supabase Database)

### Database Tables
1. **donations** table:
   - id, donor_name, amount, message, is_anonymous, created_at

### Features
- Automatic progress calculation
- Real-time leaderboard updates
- Donation form submission

---

## Technical Implementation
- React with TypeScript
- Tailwind CSS for styling
- Supabase for database
- Recharts for progress visualization
- Smooth scroll and animation libraries already available

