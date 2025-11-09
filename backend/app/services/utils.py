"""Utility functions for timetable generation"""

def format_time_slot(day: str, period: int) -> str:
    """Format a time slot as string"""
    return f"{day}-P{period + 1}"

def parse_time_slot(slot: str) -> tuple:
    """Parse a time slot string into day and period"""
    parts = slot.split("-P")
    if len(parts) == 2:
        return parts[0], int(parts[1]) - 1
    return None, None
