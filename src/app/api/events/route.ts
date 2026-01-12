import { NextResponse } from "next/server";
import { MOCK_EVENTS, getEventById, getUpcomingEvents } from "@/lib/events";

// GET /api/events - Get all events or filter by query params
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const upcoming = searchParams.get("upcoming");

  try {
    // Get single event by ID
    if (id) {
      const event = getEventById(id);
      if (!event) {
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(event);
    }

    // Get upcoming events only
    if (upcoming === "true") {
      const upcomingEvents = getUpcomingEvents();
      return NextResponse.json(upcomingEvents);
    }

    // Filter by category
    if (category && category !== "All") {
      const filteredEvents = MOCK_EVENTS.filter(
        (event) => event.category === category
      );
      return NextResponse.json(filteredEvents);
    }

    // Return all events
    return NextResponse.json(MOCK_EVENTS);

  } catch (error) {
    console.error("Events API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
