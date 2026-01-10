import axios from 'axios';

const USER_META_SELECTOR = 'meta[name="user"]';

function parseId(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : normalized;
}

export function resolveClientUserId() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (window?.Laravel?.userId) {
    return parseId(window.Laravel.userId);
  }

  const meta = document.querySelector(USER_META_SELECTOR);
  const metaValue = parseId(meta?.getAttribute('content'));
  if (metaValue) {
    return metaValue;
  }

  const datasetValue = parseId(document.body?.dataset?.userId || document.body?.dataset?.user);
  if (datasetValue) {
    return datasetValue;
  }

  return null;
}

export async function fetchUserIdFromApi() {
  const localId = resolveClientUserId();
  if (localId) {
    return localId;
  }

  try {
    const response = await axios.get('/api/userId');
    const apiValue = parseId(response.data?.userId);
    if (apiValue) {
      return apiValue;
    }
  } catch (error) {
    // swallow; helper should not break callers
  }

  return null;
}
