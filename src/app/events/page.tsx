"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_EVENTS, EVENT_CATEGORIES, formatDate } from "@/lib/events";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover <span className="gradient-text">Events</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Browse upcoming events and secure your NFT tickets. Each ticket is verifiable, 
            unique, and impossible to counterfeit.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
                aria-label="Search events"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {EVENT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group"
              >
                <article className="card h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="relative h-48 rounded-xl bg-gradient-to-br from-primary-900/50 to-accent-900/50 mb-4 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
                      {event.category}
                    </span>
                    {/* Tickets remaining */}
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-lg text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
                      {event.maxSupply - event.ticketsSold} left
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                      {event.name}
                    </h2>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="mt-auto space-y-2">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.date)}
                      </div>

                      {/* Venue */}
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.venue}
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-white/60 text-sm">Price</span>
                        <span className="text-lg font-semibold gradient-text">
                          {event.ticketPrice} ETH
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-white/60">
              Try adjusting your search or filter to find events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
