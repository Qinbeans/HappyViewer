# HappyViewer

An app to view your pet's status while you are away.

# Built with Svelte

Svelte is simple framework to build quick and efficient web apps.

# Supabase

Supabase is a firebase alternative that is open source and built on top of Postgres.

I use Supabase to store images and data as well as use Edge Functions to keep the client and worker synced up.  If a task is completed on the worker, the client will be notified and vice versa.  This is done through websockets.