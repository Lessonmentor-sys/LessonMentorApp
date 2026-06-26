(function () {
  const config = window.LESSONMENTOR_CONFIG || {};
  const hasSupabase = Boolean(config.supabaseUrl && config.supabaseAnonKey && window.supabase);
  const client = hasSupabase
    ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
    : null;

  function isDemoMode() {
    return config.demoMode !== false || !client;
  }

  async function currentUserId() {
    if (isDemoMode()) return null;
    const { data } = await client.auth.getUser();
    return data?.user?.id || null;
  }

  async function insert(table, payload) {
    if (isDemoMode()) {
      const localKey = `lessonmentor:${table}`;
      const existing = JSON.parse(localStorage.getItem(localKey) || "[]");
      const row = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload };
      existing.unshift(row);
      localStorage.setItem(localKey, JSON.stringify(existing.slice(0, 50)));
      return { data: row, error: null, demo: true };
    }

    const { data, error } = await client.from(table).insert(payload).select().single();
    return { data, error, demo: false };
  }

  async function createLessonSubmission(payload) {
    const teacherId = await currentUserId();
    return insert("lesson_submissions", teacherId ? { ...payload, teacher_id: teacherId } : payload);
  }

  async function createAssessmentLaunch(payload) {
    const teacherId = await currentUserId();
    return insert("assessment_launches", teacherId ? { ...payload, teacher_id: teacherId } : payload);
  }

  async function invokeFunction(name, payload) {
    if (isDemoMode()) {
      return { data: null, error: null, demo: true };
    }

    return client.functions.invoke(name, { body: payload });
  }

  window.LessonMentorAPI = {
    client,
    isDemoMode,
    createLessonSubmission,
    createAssessmentLaunch,
    invokeFunction
  };
})();
