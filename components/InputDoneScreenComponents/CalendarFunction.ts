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
        /* color: theme.colors.primary, */
        entityType: Calendar.EntityTypes.EVENT,
        /* sourceId: { isLocalAccount: true, name: 'Expo Calendar' }, */ /* for IOS */
        source: { isLocalAccount: true, name: 'DevizCarCalendar' },
        name: 'DevizCarCalendar',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER
      })
    } else newCalendarID = calendar.id
    console.log('IDcalendar', newCalendarID)
    return newCalendarID
  } else {
    console.log('not granted')
  }
}

export const createEvent = async (calendarId: string) => {
  const newEvent = {
    title: 'Замена масла',
    startDate: new Date('2024-05-16T10:00:00.000Z'),
    endDate: new Date('2024-05-16T11:30:00.000Z'),
    timeZone: 'Europe/Kiev', // Укажите свой часовой пояс
    location: 'Conference Room',
    notes: 'Don\'t forget your documents!'
  }

  try {
    const eventId = await Calendar.createEventAsync(calendarId, newEvent)
    console.log(`Event created successfully! Event ID: ${eventId}`)
    return eventId
  } catch (error) {
    console.error('Error creating event:', error)
  }
  /* calendars.map(value => {
    console.log('value', value.name)
    if (value.name === 'DevizCarCalendar') {
      (async () => { await Calendar.deleteCalendarAsync(value.id) }
      )()
    }
  }) */
}

export const addEvent = async () => {
  const id = await calendarId()
  if (id !== undefined) {
    return await createEvent(id)
  }
}
export const updateEvent = async (idEvent: string, newEvent: Calendar.Event) => {
  const id = await calendarId()
  if (id !== undefined) {
    return await Calendar.updateEventAsync(idEvent, { title: 'RERE' })
  }
}
export const deleteEvent = async (idEvent: string) => {
  const id = await calendarId()
  if (id !== undefined) {
    await Calendar.deleteEventAsync(idEvent)
  }
}
