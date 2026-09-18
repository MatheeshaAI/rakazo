-- A bot could have exactly one conversation thread; this lets it have several
-- (e.g. a "New Chat" action starting a fresh thread alongside older ones).
-- Purely additive: drops the 1:1 unique constraint and replaces it with a
-- plain index for lookup performance. No rows are touched or removed.
DROP INDEX "threads_botId_key";

CREATE INDEX "threads_botId_idx" ON "threads"("botId");
