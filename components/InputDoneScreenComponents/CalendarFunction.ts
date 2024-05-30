import * as Calendar from 'expo-calendar'

export const calendarId = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync()
  if (status === 'granted') {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
    console.log(calendars)
    const calendar = calendars.find(value => value.name === 'DevizCarCalendar')
    let newCalendarID: string
    if (calendar === undefined) {
      newCalendarID = await Calendar.createCalendarAsync({
        title: 'DevizCar Calendar',
        color: '#3a3477',
        entityType: Calendar.EntityTypes.EVENT,
        /* sourceId: { isLocalAccount: true, name: 'Expo Calendar' }, */ /* for IOS */
        source: { isLocalAccount: true, name: 'DevizCarCalendar', type: 'LOCAL' },
        name: 'DevizCarCalendar',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER
      })
    } else newCalendarID = calendar.id
    return newCalendarID
  } else {
    console.log('not granted')
  }
}

export const createEvent = async (calendarId: string, newEvent: Calendar.Event) => {
  try {
    const eventId = await Calendar.createEventAsync(calendarId, newEvent)
    console.log(`Event created successfully! Event ID: ${eventId}`)
    return eventId
  } catch (error) {
    console.error('Error creating event:', error)
    throw error
  }
  /* calendars.map(value => {
    console.log('value', value.name)
    if (value.name === 'DevizCarCalendar') {
      (async () => { await Calendar.deleteCalendarAsync(value.id) }
      )()
    }
  }) */
}

export const addEvent = async (newEvent: Calendar.Event) => {
  const id = await calendarId()
  if (id !== undefined) {
    return await createEvent(id, newEvent)
  } else throw new Error('Error CalendarID')
}
export const updateEvent = async (idEvent: string, newEvent: Calendar.Event) => {
  const id = await calendarId()
  if (id !== undefined) {
    return await Calendar.updateEventAsync(idEvent, newEvent)
  } else throw new Error('Error CalendarID')
}
export const deleteEvent = async (idEvent: string) => {
  const id = await calendarId()
  if (id !== undefined) {
    await Calendar.deleteEventAsync(idEvent)
  } else throw new Error('Error CalendarID')
}
