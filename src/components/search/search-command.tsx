"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Search } from "lucide-react"
import { useSearch } from "@/hooks/use-search"
import categories from "@/data/categories.json"
import neighborhoods from "@/data/neighborhoods.json"

export function SearchCommand() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { searchResults, isLoading, performSearch } = useSearch()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = React.useCallback((value: string) => {
    performSearch(value)
  }, [performSearch])

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search Jávea...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search businesses, categories, or areas..."
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {isLoading ? (
            <div className="p-4 text-center text-sm">Loading...</div>
          ) : (
            <>
              {searchResults.businesses?.length > 0 && (
                <CommandGroup heading="Businesses">
                  {searchResults.businesses.map((business) => (
                    <CommandItem
                      key={business.id}
                      onSelect={() => {
                        router.push(`/business/${business.id}`)
                        setOpen(false)
                      }}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      <span>{business.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              <CommandGroup heading="Categories">
                {categories.categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      router.push(`/${category.id}`)
                      setOpen(false)
                    }}
                  >
                    <span>{category.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Neighborhoods">
                {neighborhoods.neighborhoods.map((neighborhood) => (
                  <CommandItem
                    key={neighborhood.id}
                    onSelect={() => {
                      router.push(`/area/${neighborhood.id}`)
                      setOpen(false)
                    }}
                  >
                    <span>{neighborhood.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
